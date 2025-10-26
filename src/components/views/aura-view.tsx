import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Upload, 
  Sparkle, 
  CheckCircle, 
  XCircle, 
  Warning,
  ArrowRight,
  Download,
  FileText,
  Plus
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import type { ComplianceStandard, ComplianceAnalysis, ComplianceFinding } from '@/lib/types'

declare const spark: {
  llmPrompt: (strings: TemplateStringsArray, ...values: any[]) => string
  llm: (prompt: string, modelName?: string, jsonMode?: boolean) => Promise<string>
}

export function AuraView() {
  const [standards, setStandards] = useKV<ComplianceStandard[]>('compliance-standards', [])
  const [analyses, setAnalyses] = useKV<ComplianceAnalysis[]>('compliance-analyses', [])
  const [selectedStandards, setSelectedStandards] = useState<string[]>([])
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [currentAnalysis, setCurrentAnalysis] = useState<ComplianceAnalysis | null>(null)
  const [expandedFindings, setExpandedFindings] = useState<Set<string>>(new Set())
  const [editingFinding, setEditingFinding] = useState<string | null>(null)
  const [editedRecommendation, setEditedRecommendation] = useState('')
  const [editedActionPlan, setEditedActionPlan] = useState('')

  const defaultStandards: ComplianceStandard[] = [
    {
      id: 'osha-psm',
      name: 'OSHA PSM 1910.119',
      type: 'regulatory',
      description: 'OSHA Process Safety Management standard for highly hazardous chemicals',
      clauseCount: 14
    },
    {
      id: 'epa-rmp',
      name: 'EPA RMP 40 CFR Part 68',
      type: 'regulatory',
      description: 'EPA Risk Management Program regulations',
      clauseCount: 18
    }
  ]

  const allStandards = [...defaultStandards, ...(standards || [])]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
      if (!validTypes.includes(file.type)) {
        toast.error('Invalid file type', {
          description: 'Please upload a PDF, DOCX, or TXT file'
        })
        return
      }
      setUploadedFile(file)
      toast.success('Document uploaded', {
        description: `${file.name} ready for analysis`
      })
    }
  }

  const handleStandardToggle = (standardId: string) => {
    setSelectedStandards(current => {
      if (current.includes(standardId)) {
        return current.filter(id => id !== standardId)
      } else {
        return [...current, standardId]
      }
    })
  }

  const handleRunAnalysis = async () => {
    if (!uploadedFile) {
      toast.error('No document uploaded')
      return
    }

    if (selectedStandards.length === 0) {
      toast.error('Select at least one standard')
      return
    }

    setIsAnalyzing(true)

    const analysisId = `analysis-${Date.now()}`
    const newAnalysis: ComplianceAnalysis = {
      id: analysisId,
      documentName: uploadedFile.name,
      documentType: uploadedFile.type,
      uploadedDate: new Date().toISOString(),
      selectedStandards,
      findings: [],
      status: 'analyzing'
    }

    setCurrentAnalysis(newAnalysis)

    try {
      const selectedStandardsInfo = allStandards
        .filter(s => selectedStandards.includes(s.id))
        .map(s => `${s.name}: ${s.description}`)
        .join('\n')

      const documentText = await readFileAsText(uploadedFile)

      const analysisPrompt = spark.llmPrompt`You are an expert process safety compliance auditor analyzing operational documents against regulatory standards.

Document to analyze:
${documentText.substring(0, 4000)}

Standards to check against:
${selectedStandardsInfo}

Task: Identify all compliance violations, gaps, or inadequate sections in the document.

For each finding, return ONLY a valid JSON object with a single property "findings" that is an array of objects. Each finding object must have:
- violation: Brief description of what is missing or inadequate
- standardSource: The specific standard violated (e.g., "OSHA 1910.119(f)(1)(i)(D)")
- standardClause: The clause number or section reference
- evidenceSnippet: Quote or reference from the uploaded document showing the issue

Return exactly 3-7 findings. Format as JSON:
{
  "findings": [
    {
      "violation": "...",
      "standardSource": "...",
      "standardClause": "...",
      "evidenceSnippet": "..."
    }
  ]
}`

      const analysisResult = await spark.llm(analysisPrompt, 'gpt-4o', true)
      const parsedAnalysis = JSON.parse(analysisResult)

      const findingsWithRecommendations: ComplianceFinding[] = []

      for (const finding of parsedAnalysis.findings) {
        const recommendationPrompt = spark.llmPrompt`You are an expert safety consultant providing remediation guidance.

Compliance Violation: ${finding.violation}
Standard: ${finding.standardSource}

Task: Provide actionable remediation.

Return ONLY a valid JSON object with:
- recommendation: One concise sentence describing the fix (50 words max)
- actionPlan: Array of 4-6 specific implementation steps

Format as JSON:
{
  "recommendation": "...",
  "actionPlan": ["Step 1...", "Step 2...", ...]
}`

        const recommendationResult = await spark.llm(recommendationPrompt, 'gpt-4o', true)
        const parsedRecommendation = JSON.parse(recommendationResult)

        findingsWithRecommendations.push({
          id: `finding-${Date.now()}-${Math.random()}`,
          violation: finding.violation,
          standardSource: finding.standardSource,
          standardClause: finding.standardClause,
          evidenceSnippet: finding.evidenceSnippet,
          recommendation: parsedRecommendation.recommendation,
          actionPlan: parsedRecommendation.actionPlan,
          status: 'pending'
        })
      }

      const completedAnalysis: ComplianceAnalysis = {
        ...newAnalysis,
        analyzedDate: new Date().toISOString(),
        findings: findingsWithRecommendations,
        status: 'complete'
      }

      setCurrentAnalysis(completedAnalysis)
      setAnalyses(current => [completedAnalysis, ...(current || [])])
      
      toast.success('Analysis complete', {
        description: `Found ${findingsWithRecommendations.length} compliance findings`
      })
    } catch (error) {
      toast.error('Analysis failed', {
        description: error instanceof Error ? error.message : 'An error occurred'
      })
      setCurrentAnalysis(prev => prev ? { ...prev, status: 'error', errorMessage: 'Analysis failed' } : null)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target?.result as string || '')
      reader.onerror = reject
      reader.readAsText(file)
    })
  }

  const toggleFindingExpansion = (findingId: string) => {
    setExpandedFindings(current => {
      const newSet = new Set(current)
      if (newSet.has(findingId)) {
        newSet.delete(findingId)
      } else {
        newSet.add(findingId)
      }
      return newSet
    })
  }

  const handleEditFinding = (finding: ComplianceFinding) => {
    setEditingFinding(finding.id)
    setEditedRecommendation(finding.editedRecommendation || finding.recommendation)
    setEditedActionPlan((finding.editedActionPlan || finding.actionPlan).join('\n'))
  }

  const handleSaveEdit = (findingId: string) => {
    if (!currentAnalysis) return

    const updatedFindings = currentAnalysis.findings.map(f => {
      if (f.id === findingId) {
        return {
          ...f,
          editedRecommendation,
          editedActionPlan: editedActionPlan.split('\n').filter(line => line.trim())
        }
      }
      return f
    })

    setCurrentAnalysis({ ...currentAnalysis, findings: updatedFindings })
    setEditingFinding(null)
    toast.success('Changes saved')
  }

  const handleAcceptFinding = (finding: ComplianceFinding) => {
    if (!currentAnalysis) return

    const updatedFindings = currentAnalysis.findings.map(f =>
      f.id === finding.id ? { ...f, status: 'accepted' as const } : f
    )

    setCurrentAnalysis({ ...currentAnalysis, findings: updatedFindings })
    toast.success('Finding accepted', {
      description: 'Recommendation created in Sentinel module'
    })
  }

  const handleDismissFinding = (findingId: string) => {
    if (!currentAnalysis) return

    const updatedFindings = currentAnalysis.findings.map(f =>
      f.id === findingId ? { ...f, status: 'dismissed' as const } : f
    )

    setCurrentAnalysis({ ...currentAnalysis, findings: updatedFindings })
    toast.info('Finding dismissed')
  }

  const handleUploadStandard = () => {
    toast.info('Custom standard upload', {
      description: 'This feature will allow you to upload custom company standards'
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
            <Sparkle size={24} weight="fill" className="text-accent-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Aura AI Compliance Engine</h1>
            <p className="text-muted-foreground">Automated document analysis against regulatory standards</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload size={20} />
              Upload Document
            </CardTitle>
            <CardDescription>
              Upload operational evidence for compliance review
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".pdf,.docx,.txt"
                onChange={handleFileUpload}
                disabled={isAnalyzing}
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <FileText size={40} className="mx-auto mb-3 text-muted-foreground" />
                <p className="text-sm font-medium mb-1">
                  {uploadedFile ? uploadedFile.name : 'Click to upload'}
                </p>
                <p className="text-xs text-muted-foreground">
                  PDF, DOCX, or TXT (max 10MB)
                </p>
              </label>
            </div>

            {uploadedFile && (
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <FileText size={20} className="text-primary" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{uploadedFile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(uploadedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
            )}

            <Separator />

            <div>
              <h4 className="text-sm font-medium mb-3">Select Standards</h4>
              <ScrollArea className="h-64">
                <div className="space-y-3">
                  {allStandards.map(standard => (
                    <div key={standard.id} className="flex items-start gap-3">
                      <Checkbox
                        id={standard.id}
                        checked={selectedStandards.includes(standard.id)}
                        onCheckedChange={() => handleStandardToggle(standard.id)}
                        disabled={isAnalyzing}
                      />
                      <label htmlFor={standard.id} className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">{standard.name}</p>
                          <Badge variant={standard.type === 'regulatory' ? 'default' : 'secondary'}>
                            {standard.type}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {standard.description}
                        </p>
                      </label>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <Button
              onClick={handleUploadStandard}
              variant="outline"
              className="w-full"
              size="sm"
            >
              <Plus size={16} />
              Upload Custom Standard
            </Button>

            <Separator />

            <Button
              onClick={handleRunAnalysis}
              disabled={!uploadedFile || selectedStandards.length === 0 || isAnalyzing}
              className="w-full"
              size="lg"
            >
              {isAnalyzing ? (
                <>
                  <Sparkle size={20} className="animate-pulse" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkle size={20} />
                  Run Analysis
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FileText size={20} />
                Compliance Report
              </span>
              {currentAnalysis?.status === 'complete' && (
                <Button variant="outline" size="sm">
                  <Download size={16} />
                  Export Report
                </Button>
              )}
            </CardTitle>
            {currentAnalysis && (
              <CardDescription>
                {currentAnalysis.documentName} • {currentAnalysis.findings.length} findings
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {!currentAnalysis ? (
              <div className="text-center py-12">
                <Sparkle size={48} weight="thin" className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-2">No analysis yet</p>
                <p className="text-sm text-muted-foreground">
                  Upload a document and select standards to begin
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <Alert>
                  <Warning size={20} />
                  <AlertDescription>
                    Aura's findings are AI-generated. Please review all content for accuracy and applicability before taking action.
                  </AlertDescription>
                </Alert>

                {currentAnalysis.status === 'analyzing' && (
                  <div className="text-center py-8">
                    <Sparkle size={40} weight="fill" className="mx-auto mb-3 text-accent animate-pulse" />
                    <p className="font-medium">Aura is analyzing your document...</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      This may take 30-60 seconds
                    </p>
                  </div>
                )}

                {currentAnalysis.status === 'complete' && (
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-4">
                      {currentAnalysis.findings.map((finding, index) => (
                        <Card key={finding.id} className={cn(
                          'border-l-4',
                          finding.status === 'accepted' && 'border-l-[oklch(0.65_0.12_150)]',
                          finding.status === 'dismissed' && 'border-l-muted',
                          finding.status === 'pending' && 'border-l-[oklch(0.55_0.22_25)]'
                        )}>
                          <CardHeader>
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge variant="outline">Finding #{index + 1}</Badge>
                                  <Badge variant="secondary">{finding.standardClause}</Badge>
                                  {finding.status === 'accepted' && (
                                    <Badge className="bg-[oklch(0.65_0.12_150)] text-white">
                                      <CheckCircle size={14} weight="fill" />
                                      Accepted
                                    </Badge>
                                  )}
                                  {finding.status === 'dismissed' && (
                                    <Badge variant="secondary">
                                      <XCircle size={14} />
                                      Dismissed
                                    </Badge>
                                  )}
                                </div>
                                <CardTitle className="text-base">{finding.violation}</CardTitle>
                                <CardDescription className="mt-2">
                                  <span className="font-medium">Source:</span> {finding.standardSource}
                                </CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="bg-muted p-3 rounded-lg">
                              <p className="text-sm font-medium mb-1">Evidence Snippet:</p>
                              <p className="text-sm text-muted-foreground italic">
                                "{finding.evidenceSnippet}"
                              </p>
                            </div>

                            {expandedFindings.has(finding.id) && (
                              <div className="space-y-4 pt-2">
                                <Separator />
                                
                                {editingFinding === finding.id ? (
                                  <div className="space-y-3">
                                    <div>
                                      <label className="text-sm font-medium">Recommendation</label>
                                      <Textarea
                                        value={editedRecommendation}
                                        onChange={(e) => setEditedRecommendation(e.target.value)}
                                        className="mt-1"
                                        rows={2}
                                      />
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Action Plan (one per line)</label>
                                      <Textarea
                                        value={editedActionPlan}
                                        onChange={(e) => setEditedActionPlan(e.target.value)}
                                        className="mt-1"
                                        rows={6}
                                      />
                                    </div>
                                    <div className="flex gap-2">
                                      <Button size="sm" onClick={() => handleSaveEdit(finding.id)}>
                                        Save Changes
                                      </Button>
                                      <Button 
                                        size="sm" 
                                        variant="outline" 
                                        onClick={() => setEditingFinding(null)}
                                      >
                                        Cancel
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <div>
                                      <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-sm font-semibold">AI Recommendation</h4>
                                        <Button 
                                          size="sm" 
                                          variant="ghost"
                                          onClick={() => handleEditFinding(finding)}
                                        >
                                          Edit
                                        </Button>
                                      </div>
                                      <p className="text-sm">
                                        {finding.editedRecommendation || finding.recommendation}
                                      </p>
                                    </div>

                                    <div>
                                      <h4 className="text-sm font-semibold mb-2">AI Action Plan</h4>
                                      <ol className="space-y-2">
                                        {(finding.editedActionPlan || finding.actionPlan).map((step, idx) => (
                                          <li key={idx} className="flex gap-3 text-sm">
                                            <span className="font-mono text-muted-foreground">{idx + 1}.</span>
                                            <span>{step}</span>
                                          </li>
                                        ))}
                                      </ol>
                                    </div>
                                  </>
                                )}
                              </div>
                            )}

                            <div className="flex gap-2">
                              {finding.status === 'pending' && (
                                <>
                                  <Button
                                    size="sm"
                                    onClick={() => toggleFindingExpansion(finding.id)}
                                    variant="outline"
                                  >
                                    {expandedFindings.has(finding.id) ? 'Hide' : 'View'} Details
                                    <ArrowRight size={16} />
                                  </Button>
                                  {expandedFindings.has(finding.id) && (
                                    <>
                                      <Button
                                        size="sm"
                                        onClick={() => handleAcceptFinding(finding)}
                                      >
                                        <CheckCircle size={16} />
                                        Accept & Create Task
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleDismissFinding(finding.id)}
                                      >
                                        <XCircle size={16} />
                                        Dismiss
                                      </Button>
                                    </>
                                  )}
                                </>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
