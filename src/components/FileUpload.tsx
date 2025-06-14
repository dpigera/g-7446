
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

interface FileUploadProps {
  projectId: string;
  onUploadComplete: (userCount: number, userData: any[]) => void;
}

interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  [key: string]: any;
}

const FileUpload: React.FC<FileUploadProps> = ({ projectId, onUploadComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const fileType = selectedFile.name.toLowerCase();
      if (fileType.endsWith('.csv') || fileType.endsWith('.xlsx') || fileType.endsWith('.xls')) {
        setFile(selectedFile);
        setUploadStatus('idle');
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a CSV or XLSX file.",
          variant: "destructive",
        });
      }
    }
  };

  const parseCSV = (file: File): Promise<UserData[]> => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          resolve(results.data as UserData[]);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  };

  const parseXLSX = (file: File): Promise<UserData[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet) as UserData[];
          resolve(jsonData);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsArrayBuffer(file);
    });
  };

  const processUserData = (rawData: UserData[]): any[] => {
    return rawData
      .filter(row => row.first_name && row.last_name && row.email)
      .map(row => {
        const { first_name, last_name, email, ...additionalData } = row;
        
        // Remove any empty/undefined values from additional data
        const cleanAdditionalData = Object.fromEntries(
          Object.entries(additionalData).filter(([_, value]) => 
            value !== undefined && value !== null && value !== ''
          )
        );

        return {
          project_id: projectId,
          first_name: String(first_name).trim(),
          last_name: String(last_name).trim(),
          email: String(email).trim(),
          data: Object.keys(cleanAdditionalData).length > 0 ? cleanAdditionalData : null
        };
      });
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadStatus('idle');

    try {
      let parsedData: UserData[];

      if (file.name.toLowerCase().endsWith('.csv')) {
        parsedData = await parseCSV(file);
      } else {
        parsedData = await parseXLSX(file);
      }

      const processedUsers = processUserData(parsedData);

      if (processedUsers.length === 0) {
        throw new Error('No valid user records found. Please ensure your file has first_name, last_name, and email columns.');
      }

      // Insert users into database
      const { error } = await supabase
        .from('project_users')
        .insert(processedUsers);

      if (error) {
        throw error;
      }

      // Fetch the uploaded users to display in preview
      const { data: uploadedUsers, error: fetchError } = await supabase
        .from('project_users')
        .select('first_name, last_name, email')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false })
        .limit(processedUsers.length);

      if (fetchError) {
        console.error('Error fetching uploaded users:', fetchError);
        // Still show success but without detailed preview
        onUploadComplete(processedUsers.length, []);
      } else {
        onUploadComplete(processedUsers.length, uploadedUsers || []);
      }

      setUploadStatus('success');
      toast({
        title: "Upload successful!",
        description: `Successfully uploaded ${processedUsers.length} users.`,
      });

    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('error');
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "An error occurred while uploading the file.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Upload className="w-5 h-5" />
          <span>Upload User List</span>
        </CardTitle>
        <CardDescription>
          Upload a CSV or XLSX file with user data. Required columns: first_name, last_name, email
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileChange}
            className="cursor-pointer"
          />
          <div className="text-center">
            <a 
              href="https://docs.google.com/spreadsheets/d/1QbVGWW9woSfHoFXamMY9nkQYrl7B3fEVUlPxYIpgtg0/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline text-sm"
            >
              Click here for a starting template for your CSV file
            </a>
          </div>
          {file && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <FileText className="w-4 h-4" />
              <span>{file.name}</span>
            </div>
          )}
        </div>

        {uploadStatus === 'success' && (
          <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-md">
            <CheckCircle className="w-4 h-4" />
            <span>File uploaded successfully!</span>
          </div>
        )}

        {uploadStatus === 'error' && (
          <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-md">
            <AlertCircle className="w-4 h-4" />
            <span>Upload failed. Please try again.</span>
          </div>
        )}

        <Button 
          onClick={handleUpload} 
          disabled={!file || isUploading}
          className="w-full"
        >
          {isUploading ? 'Uploading...' : 'Upload Users'}
        </Button>

        <div className="text-sm text-gray-500 space-y-1">
          <p>• File should contain columns: first_name, last_name, email</p>
          <p>• Additional columns will be stored as custom data</p>
          <p>• Supported formats: CSV, XLSX, XLS</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUpload;
