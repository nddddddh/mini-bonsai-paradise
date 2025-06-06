
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useApp } from '../context/AppContext';

const UserProfile = () => {
  const { state } = useApp();

  if (!state.user) return null;

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <Avatar className="h-20 w-20 mx-auto mb-4">
          <AvatarImage src={state.user.avatar} />
          <AvatarFallback className="text-2xl">
            {state.user.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="text-xl">{state.user.name}</CardTitle>
        <Badge variant={state.user.role === 'admin' ? 'destructive' : 'secondary'}>
          {state.user.role === 'admin' ? 'Quản trị viên' : 'Khách hàng'}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold text-sm text-gray-600 mb-1">Email</h4>
          <p>{state.user.email}</p>
        </div>
        <div>
          <h4 className="font-semibold text-sm text-gray-600 mb-1">Số điện thoại</h4>
          <p>{state.user.phone}</p>
        </div>
        <div>
          <h4 className="font-semibold text-sm text-gray-600 mb-1">Địa chỉ</h4>
          <p>{state.user.address}</p>
        </div>
        <div>
          <h4 className="font-semibold text-sm text-gray-600 mb-1">Sản phẩm yêu thích</h4>
          <p>{state.favorites.length} sản phẩm</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
