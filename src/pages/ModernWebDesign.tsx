import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, MonitorSmartphone, Palette, Code2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ModernWebDesignProps {
  onNext?: () => void;
  onBack?: () => void;
}

export default function ModernWebDesign({ onNext, onBack }: ModernWebDesignProps) {
  const navigate = useNavigate();

  return (
    <section className="min-h-[calc(100vh-80px)] flex items-start justify-center bg-white font-sans pt-7 overflow-hidden">
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center h-full">
        <div className="text-center w-full mb-0">
          <h2 className="text-2xl font-bold mb-2 text-gray-900">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Modern Web Design
            </span>
          </h2>
          <p className="text-base text-gray-600 max-w-1xl mx-auto leading-normal">
            Craft beautiful, responsive, and user-centric web applications with the latest design patterns and technologies.
          </p>
        </div>
        <div className="h-4" />
        <div className="grid lg:grid-cols-3 gap-6 w-full flex-1 mt-0">
          <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white rounded-3xl flex flex-col min-h-[340px] h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 opacity-50"></div>
            <div className="relative p-6 flex flex-col flex-1">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <MonitorSmartphone className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Responsive Layouts</h3>
              <p className="text-gray-600 mb-5 leading-normal text-sm">Design layouts that adapt seamlessly to any device or screen size.</p>
              <ul className="space-y-2 flex-1">
                <li className="flex items-center text-blue-700 text-sm font-medium"><ArrowRight className="w-4 h-4 mr-2" />Mobile-first approach</li>
                <li className="flex items-center text-blue-700 text-sm font-medium"><ArrowRight className="w-4 h-4 mr-2" />Grid & Flexbox mastery</li>
                <li className="flex items-center text-blue-700 text-sm font-medium"><ArrowRight className="w-4 h-4 mr-2" />Accessibility best practices</li>
              </ul>
            </div>
          </Card>
          <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white rounded-3xl flex flex-col min-h-[340px] h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-50"></div>
            <div className="relative p-6 flex flex-col flex-1">
              <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Palette className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Visual Excellence</h3>
              <p className="text-gray-600 mb-5 leading-normal text-sm">Leverage modern UI trends and color theory for stunning interfaces.</p>
              <ul className="space-y-2 flex-1">
                <li className="flex items-center text-purple-700 text-sm font-medium"><ArrowRight className="w-4 h-4 mr-2" />Consistent design systems</li>
                <li className="flex items-center text-purple-700 text-sm font-medium"><ArrowRight className="w-4 h-4 mr-2" />Micro-interactions & animations</li>
                <li className="flex items-center text-purple-700 text-sm font-medium"><ArrowRight className="w-4 h-4 mr-2" />Dark mode support</li>
              </ul>
            </div>
          </Card>
          <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white rounded-3xl flex flex-col min-h-[340px] h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 opacity-50"></div>
            <div className="relative p-6 flex flex-col flex-1">
              <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Code2 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Cutting-edge Tech</h3>
              <p className="text-gray-600 mb-5 leading-normal text-sm">Utilize the latest frameworks and tools for robust, scalable apps.</p>
              <ul className="space-y-2 flex-1">
                <li className="flex items-center text-emerald-700 text-sm font-medium"><ArrowRight className="w-4 h-4 mr-2" />React & TypeScript</li>
                <li className="flex items-center text-emerald-700 text-sm font-medium"><ArrowRight className="w-4 h-4 mr-2" />Component-driven development</li>
                <li className="flex items-center text-emerald-700 text-sm font-medium"><ArrowRight className="w-4 h-4 mr-2" />API-first architecture</li>
              </ul>
            </div>
          </Card>
        </div>
        <div className="flex justify-between w-full max-w-3xl mt-12">
          <Button variant="outline" className="flex items-center" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <Button className="flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold" onClick={onNext}>Continue <ArrowRight className="w-4 h-4 ml-2" /></Button>
        </div>
      </div>
    </section>
  );
}
