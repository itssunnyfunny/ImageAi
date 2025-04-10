"use client";
import * as React from "react"

import { Button } from "@/components/ui/button"
import UploadImage from "@/components/ui/upload"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Upload } from "lucide-react"

export default function Train() {
  return (
    <div className="flex h-screen items-center justify-center">
    <Card className="w-[350px] px-4">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of the model" />
            </div>
            <div>
                <Label htmlFor="description">Model Type</Label>
                <Select>    
                     <SelectTrigger id="description">
                        <SelectValue placeholder="Select" />        
                        </SelectTrigger>
                        <SelectContent position="popper">
                            <SelectItem value="man" >Man</SelectItem>
                            <SelectItem value="woman">Women</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                </Select>
            </div>
             <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Age</Label>
                <Input id="description" placeholder="Age of the model" />
             </div>
             <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Ethinicity</Label>
                <Select>
                    <SelectTrigger id="description">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="white">White</SelectItem>
                        <SelectItem value="black">Black</SelectItem>
                        <SelectItem value="Asian_American">Asian American</SelectItem>
                        <SelectItem value="East_Asian">East Asian</SelectItem>
                        <SelectItem value="South_Asian">South Asian</SelectItem>    
                        <SelectItem value="South_East_Asian">South East Asian</SelectItem>
                         <SelectItem value="Middle_Eastern">Middle Eastern</SelectItem>
                    </SelectContent>
                </Select>
             </div>
            < div className="flex flex-col space-y-1.5">
             <Label htmlFor="name">Eye Color</Label>
          <Select>
                <SelectTrigger id="name" >
                   <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">  
                    <SelectItem value="brown">Brown</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="black">Black</SelectItem>
                    <SelectItem value="gray">Gray</SelectItem>
                    <SelectItem value="hazel">Hazel</SelectItem>        
                 </SelectContent >
          </Select>  
            </div> 
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Bald</Label>
               <Switch id="name" />
          </div>
          <div>
            <UploadImage />
          </div>
          </div>
        
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Creat Model</Button>
      </CardFooter>
    </Card>
    </div>
  )
}
