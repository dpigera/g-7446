
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';

interface UserData {
  first_name: string;
  last_name: string;
  email: string;
}

interface UserDataPreviewProps {
  users: UserData[];
  userCount: number;
  onContinue: () => void;
}

const UserDataPreview: React.FC<UserDataPreviewProps> = ({ users, userCount, onContinue }) => {
  return (
    <div className="space-y-6">
      <Card className="bg-green-500/10 border-green-500/30">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center space-x-3 text-green-400">
            <Users className="w-6 h-6" />
            <span className="text-lg font-medium">
              We've created {userCount} user records
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader>
          <CardTitle className="text-white">User Data Preview</CardTitle>
          <CardDescription className="text-gray-300">
            Here's a preview of the uploaded user data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-white/20 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-white/20 hover:bg-white/5">
                  <TableHead className="text-gray-300">First Name</TableHead>
                  <TableHead className="text-gray-300">Last Name</TableHead>
                  <TableHead className="text-gray-300">Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.slice(0, 10).map((user, index) => (
                  <TableRow key={index} className="border-white/20 hover:bg-white/5">
                    <TableCell className="text-white">{user.first_name}</TableCell>
                    <TableCell className="text-white">{user.last_name}</TableCell>
                    <TableCell className="text-white">{user.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {userCount > 10 && (
            <p className="text-gray-400 text-sm mt-3 text-center">
              Showing first 10 of {userCount} users
            </p>
          )}
        </CardContent>
      </Card>

      <div className="text-center">
        <Button 
          onClick={onContinue}
          size="lg"
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-8"
        >
          Looks good! Let's build content!
        </Button>
      </div>
    </div>
  );
};

export default UserDataPreview;
