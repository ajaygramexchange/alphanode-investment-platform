// app/(dashboard)/profile/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { User, Shield, Camera } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ProfilePage() {
  const [kycStatus, setKycStatus] = useState<"not-started" | "pending" | "verified">("not-started");
  
  const [formData, setFormData] = useState({
    fullName: "Alex Morgan",
    email: "alex@example.com",
    phone: "+1 (555) 123-4567",
    country: "United States",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleKYCSubmit = () => {
    setKycStatus("pending");
    toast.success("KYC Submission Received", {
      description: "Your documents are under review. This usually takes 24-48 hours.",
    });
  };

  const isVerified = kycStatus === "verified";

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Profile & KYC</h1>
        <p className="text-zinc-400 mt-2">Manage your account and complete verification</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <User className="w-6 h-6" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Full Name</Label>
                  <Input 
                    name="fullName"
                    value={formData.fullName} 
                    onChange={handleInputChange}
                    className="bg-zinc-950 border-zinc-700 mt-1" 
                  />
                </div>
                <div>
                  <Label>Email Address</Label>
                  <Input 
                    name="email"
                    value={formData.email} 
                    onChange={handleInputChange}
                    className="bg-zinc-950 border-zinc-700 mt-1" 
                  />
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input 
                    name="phone"
                    value={formData.phone} 
                    onChange={handleInputChange}
                    className="bg-zinc-950 border-zinc-700 mt-1" 
                  />
                </div>
                <div>
                  <Label>Country</Label>
                  <Input 
                    name="country"
                    value={formData.country} 
                    onChange={handleInputChange}
                    className="bg-zinc-950 border-zinc-700 mt-1" 
                  />
                </div>
              </div>

              <Button className="w-full">Save Changes</Button>
            </CardContent>
          </Card>

          {/* KYC Section */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="w-6 h-6" />
                KYC Verification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-zinc-950 rounded-2xl">
                <div>
                  <p className="font-medium">Verification Status</p>
                  <Badge 
                    variant={isVerified ? "default" : kycStatus === "pending" ? "secondary" : "destructive"}
                    className={isVerified ? "bg-emerald-500" : ""}
                  >
                    {isVerified ? "Verified" : kycStatus === "pending" ? "Under Review" : "Not Verified"}
                  </Badge>
                </div>
                <div className="text-right text-sm text-zinc-400">
                  Required for large withdrawals
                </div>
              </div>

              {kycStatus === "not-started" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-dashed border-zinc-700 rounded-2xl p-8 text-center hover:border-violet-500 transition-colors cursor-pointer">
                      <Camera className="mx-auto w-10 h-10 mb-4 text-zinc-400" />
                      <p className="font-medium">Upload Government ID</p>
                    </div>
                    <div className="border border-dashed border-zinc-700 rounded-2xl p-8 text-center hover:border-violet-500 transition-colors cursor-pointer">
                      <Camera className="mx-auto w-10 h-10 mb-4 text-zinc-400" />
                      <p className="font-medium">Upload Selfie</p>
                    </div>
                  </div>

                  <Button onClick={handleKYCSubmit} className="w-full py-6 text-lg">
                    Submit for Verification
                  </Button>
                </div>
              )}

              {kycStatus === "pending" && (
                <div className="text-center py-12">
                  <Shield className="w-16 h-16 mx-auto text-amber-500" />
                  <h3 className="mt-6 text-xl font-semibold">Verification in Progress</h3>
                  <p className="text-zinc-400 mt-2">Our team is reviewing your documents.</p>
                </div>
              )}

              {isVerified && (
                <div className="text-center py-12 text-emerald-500">
                  <Shield className="w-16 h-16 mx-auto" />
                  <h3 className="mt-6 text-2xl font-semibold">KYC Verified ✓</h3>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Summary */}
        <div className="space-y-6">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle>Account Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-xs text-zinc-400">Member Since</p>
                <p className="font-medium">April 2026</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400">Total Invested</p>
                <p className="font-medium">$18,750.00</p>
              </div>
              <div>
                <p className="text-xs text-zinc-400">Total Earned</p>
                <p className="font-medium text-emerald-500">+$4,652.30</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}