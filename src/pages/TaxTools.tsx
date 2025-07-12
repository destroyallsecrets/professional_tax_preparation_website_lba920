import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export function TaxTools() {
  const [activeCalculator, setActiveCalculator] = useState<"deduction" | "tax" | "calendar">("deduction");
  
  // Standard Deduction Calculator State
  const [deductionInputs, setDeductionInputs] = useState({
    filingStatus: "single" as const,
    taxYear: 2024,
    age65OrOlder: false,
    blind: false,
  });

  // Tax Estimation Calculator State
  const [taxInputs, setTaxInputs] = useState({
    income: 75000,
    filingStatus: "single" as const,
    deductions: 14600,
    taxYear: 2024,
  });

  const [standardDeduction, setStandardDeduction] = useState<any>(null);
  const [estimatedTax, setEstimatedTax] = useState<any>(null);
  
  const calculateStandardDeduction = useMutation(api.taxTools.calculateStandardDeduction);
  const calculateEstimatedTax = useMutation(api.taxTools.calculateEstimatedTax);
  const taxDueDates = useQuery(api.taxTools.getTaxDueDates, { taxYear: 2024 });

  const handleCalculateDeduction = async () => {
    try {
      const result = await calculateStandardDeduction(deductionInputs);
      setStandardDeduction(result);
    } catch (error) {
      console.error("Failed to calculate deduction:", error);
    }
  };

  const handleCalculateTax = async () => {
    try {
      const result = await calculateEstimatedTax(taxInputs);
      setEstimatedTax(result);
    } catch (error) {
      console.error("Failed to calculate tax:", error);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-bold text-slate-800 mb-6">
            Free Tax Tools
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Use our professional-grade tax calculators and tools to estimate your taxes, 
            plan your finances, and stay on top of important deadlines.
          </p>
        </div>

        {/* Tool Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { id: "deduction", label: "Standard Deduction", icon: "📊" },
            { id: "tax", label: "Tax Estimator", icon: "💰" },
            { id: "calendar", label: "Tax Calendar", icon: "📅" },
          ].map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveCalculator(tool.id as any)}
              className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeCalculator === tool.id
                  ? "bg-blue-600 text-white shadow-lg transform scale-105"
                  : "bg-white text-slate-700 hover:bg-blue-50 border border-slate-200"
              }`}
            >
              <span className="text-xl">{tool.icon}</span>
              <span>{tool.label}</span>
            </button>
          ))}
        </div>

        {/* Standard Deduction Calculator */}
        {activeCalculator === "deduction" && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
              Standard Deduction Calculator
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Filing Status
                  </label>
                  <select
                    title="Filing Status Selection"
                    value={deductionInputs.filingStatus}
                    onChange={(e) => setDeductionInputs(prev => ({
                      ...prev,
                      filingStatus: e.target.value as any
                    }))}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="single">Single</option>
                    <option value="marriedFilingJointly">Married Filing Jointly</option>
                    <option value="marriedFilingSeparately">Married Filing Separately</option>
                    <option value="headOfHousehold">Head of Household</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Tax Year
                  </label>
                  <select
                    title="Tax Year Selection"
                    value={deductionInputs.taxYear}
                    onChange={(e) => setDeductionInputs(prev => ({
                      ...prev,
                      taxYear: parseInt(e.target.value)
                    }))}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value={2024}>2024</option>
                    <option value={2023}>2023</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={deductionInputs.age65OrOlder}
                      onChange={(e) => setDeductionInputs(prev => ({
                        ...prev,
                        age65OrOlder: e.target.checked
                      }))}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-slate-700">Age 65 or older</span>
                  </label>

                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={deductionInputs.blind}
                      onChange={(e) => setDeductionInputs(prev => ({
                        ...prev,
                        blind: e.target.checked
                      }))}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-slate-700">Blind</span>
                  </label>
                </div>

                <button
                  onClick={() => void handleCalculateDeduction()}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Calculate Deduction
                </button>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Your Standard Deduction</h3>
                
                {standardDeduction && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-slate-200">
                      <span className="text-slate-600">Base Deduction:</span>
                      <span className="font-bold text-slate-800">
                        ${standardDeduction.baseDeduction.toLocaleString()}
                      </span>
                    </div>
                    
                    {standardDeduction.additionalDeduction > 0 && (
                      <div className="flex justify-between items-center py-3 border-b border-slate-200">
                        <span className="text-slate-600">Additional Deduction:</span>
                        <span className="font-bold text-slate-800">
                          ${standardDeduction.additionalDeduction.toLocaleString()}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center py-3 bg-blue-100 rounded-lg px-4">
                      <span className="text-blue-800 font-semibold">Total Deduction:</span>
                      <span className="font-bold text-2xl text-blue-800">
                        ${standardDeduction.totalDeduction.toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tax Estimation Calculator */}
        {activeCalculator === "tax" && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
              Tax Estimation Calculator
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Annual Income
                  </label>
                  <input
                    type="number"
                    value={taxInputs.income}
                    onChange={(e) => setTaxInputs(prev => ({
                      ...prev,
                      income: parseInt(e.target.value) || 0
                    }))}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="75000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Filing Status
                  </label>
                  <select
                    title="Filing Status Selection"
                    value={taxInputs.filingStatus}
                    onChange={(e) => setTaxInputs(prev => ({
                      ...prev,
                      filingStatus: e.target.value as any
                    }))}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="single">Single</option>
                    <option value="marriedFilingJointly">Married Filing Jointly</option>
                    <option value="marriedFilingSeparately">Married Filing Separately</option>
                    <option value="headOfHousehold">Head of Household</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Total Deductions
                  </label>
                  <input
                    type="number"
                    value={taxInputs.deductions}
                    onChange={(e) => setTaxInputs(prev => ({
                      ...prev,
                      deductions: parseInt(e.target.value) || 0
                    }))}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="14600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Tax Year
                  </label>
                  <select
                    title="Tax Year Selection"
                    value={taxInputs.taxYear}
                    onChange={(e) => setTaxInputs(prev => ({
                      ...prev,
                      taxYear: parseInt(e.target.value)
                    }))}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value={2024}>2024</option>
                    <option value={2023}>2023</option>
                  </select>
                </div>

                <button
                  onClick={() => void handleCalculateTax()}
                  className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Calculate Tax
                </button>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Tax Estimation</h3>
                
                {estimatedTax && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-slate-200">
                      <span className="text-slate-600">Taxable Income:</span>
                      <span className="font-bold text-slate-800">
                        ${estimatedTax.taxableIncome.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center py-3 border-b border-slate-200">
                      <span className="text-slate-600">Effective Tax Rate:</span>
                      <span className="font-bold text-slate-800">
                        {estimatedTax.effectiveRate}%
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center py-3 border-b border-slate-200">
                      <span className="text-slate-600">Marginal Tax Rate:</span>
                      <span className="font-bold text-slate-800">
                        {estimatedTax.marginalRate}%
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center py-3 bg-green-100 rounded-lg px-4">
                      <span className="text-green-800 font-semibold">Estimated Tax:</span>
                      <span className="font-bold text-2xl text-green-800">
                        ${estimatedTax.estimatedTax.toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-800">
                    <strong>Disclaimer:</strong> This is a simplified estimation for planning purposes only. 
                    Actual tax calculations may vary based on additional factors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tax Calendar */}
        {activeCalculator === "calendar" && taxDueDates && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
              2024 Tax Calendar
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Important Deadlines</h3>
                <div className="space-y-4">
                  {taxDueDates.dueDates.map((date, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200"
                    >
                      <div className="font-bold text-blue-800 text-lg">{date.date}</div>
                      <div className="text-slate-700 font-medium">{date.description}</div>
                      <div className="text-sm text-slate-500 capitalize mt-1">{date.type}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Quarterly Estimated Tax Dates</h3>
                <div className="space-y-4">
                  {taxDueDates.quarterlyDates.map((date, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-green-800 text-lg">{date.date}</div>
                          <div className="text-slate-700 font-medium">{date.description}</div>
                        </div>
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {date.quarter}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200">
              <h3 className="text-2xl font-bold text-amber-800 mb-4">Important Reminders</h3>
              <ul className="space-y-3 text-amber-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>File for an extension by April 15th if you need more time (extends filing deadline to October 15th)</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Pay estimated taxes quarterly if you expect to owe $1,000 or more</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Keep organized records throughout the year for easier tax preparation</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Consider maximizing retirement contributions before year-end</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm max-w-2xl mx-auto">
            These tools provide estimates for planning purposes only. Tax laws are complex and subject to change. 
            For accurate tax preparation and personalized advice, please consult with a qualified tax professional.
          </p>
        </div>
      </div>
    </div>
  );
}
