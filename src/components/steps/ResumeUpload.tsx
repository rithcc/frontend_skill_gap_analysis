
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Plus, Trash2, Brain, Zap, BarChart3 } from "lucide-react";

interface ResumeUploadProps {
  onNext?: () => void;
  onBack?: () => void;
}

const ResumeUpload = ({ onNext, onBack }: ResumeUploadProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleAnalyze = () => {
    console.log("Analyzing team intelligence with uploaded files:", uploadedFiles);
    // Call onNext to proceed to the next step (EmployeeSkillCards)
    if (onNext) {
      onNext();
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <div className="w-16 h-16 bg-modern-blue rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Upload <span className="modern-blue">Team Data</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Upload team profiles to unleash AI-powered skill gap analysis. Our intelligent system 
          will process and analyze capabilities against your defined framework.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Upload Section */}
        <Card className="p-8 bg-white border border-gray-200 shadow-lg">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-modern-blue rounded-xl flex items-center justify-center mr-4">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Resume Upload</h3>
              <p className="text-gray-600 text-sm">Resume processing</p>
            </div>
          </div>
          
          <div className="relative group">
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-modern-blue transition-all duration-300 bg-gray-50 group-hover:bg-blue-50">
              <div className="w-16 h-16 bg-modern-blue rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <p className="text-lg font-semibold text-gray-900 mb-2">
                Drop files or click to browse
              </p>
              <p className="text-sm text-gray-500 mb-6">
                PDF, DOC, DOCX • Max 10MB each • Batch upload supported
              </p>
              
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              
              <Button asChild className="bg-modern-blue hover:bg-modern-blue/90 text-white border-0 px-8 py-3 rounded-xl">
                <label htmlFor="file-upload" className="cursor-pointer">
                  Select Files
                </label>
              </Button>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <Button variant="outline" className="flex items-center border-gray-300 hover:border-gray-400 text-gray-700">
              <Plus className="w-4 h-4 mr-2" />
              Add More
            </Button>
            <Button 
              variant="outline" 
              className="text-red-600 hover:text-red-700 border-red-300 hover:border-red-400"
              onClick={() => setUploadedFiles([])}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
        </Card>

        {/* Uploaded Files */}
        <Card className="p-8 bg-white border border-gray-200 shadow-lg">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-modern-purple rounded-xl flex items-center justify-center mr-4">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Processing Queue ({uploadedFiles.length})
              </h3>
              <p className="text-gray-600 text-sm">Ready for AI analysis</p>
            </div>
          </div>
          
          {uploadedFiles.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">No files uploaded yet</p>
              <p className="text-sm text-gray-400 mt-2">Upload team profiles to begin analysis</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-72 overflow-y-auto">
              {uploadedFiles.map((file, index) => (
                <div 
                  key={index}
                  className="group flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-modern-blue transition-all duration-300"
                >
                  <div className="flex items-center flex-1">
                    <div className="w-10 h-10 bg-modern-blue rounded-lg flex items-center justify-center mr-4">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB • Ready for processing
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Analysis Preview */}
      {uploadedFiles.length > 0 && (
        <Card className="p-8 bg-white border border-gray-200 shadow-lg mb-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-modern-green rounded-xl flex items-center justify-center mr-4">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Analysis Preview</h3>
                <p className="text-gray-600 text-sm">AI-powered skill intelligence ready</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold modern-blue">{uploadedFiles.length}</div>
                <div className="text-sm text-gray-500">Profiles Ready</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold modern-purple">AI</div>
                <div className="text-sm text-gray-500">Analysis Engine</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold modern-green">360°</div>
                <div className="text-sm text-gray-500">Skill Mapping</div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button 
          variant="outline"
          className="border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3"
          onClick={onBack}
        >
          ← Back to Framework
        </Button>
        
        <div className="flex gap-4">
          <Button 
            variant="outline"
            className="border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3"
          >
            Save Progress
          </Button>
          <Button 
            onClick={handleAnalyze}
            className="bg-modern-blue hover:bg-modern-blue/90 text-white px-12 py-3 rounded-xl font-semibold disabled:opacity-50"
            disabled={uploadedFiles.length === 0}
          >
            <div className="flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Launch AI Analysis
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResumeUpload;