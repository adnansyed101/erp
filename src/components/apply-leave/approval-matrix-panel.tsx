'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { User } from 'lucide-react'

export interface ApproverInfo {
  name: string
  designation: string
  status?: 'pending' | 'approved' | 'rejected'
}

export function ApprovalMatrixPanel({ approver }: { approver: ApproverInfo }) {
  const statusColors = {
    pending: 'bg-yellow-400',
    approved: 'bg-green-400',
    rejected: 'bg-red-400',
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Approval Matrix</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          <div className="w-full rounded-lg bg-linear-to-r from-orange-400 to-orange-500 p-6 text-center text-white">
            <div className="mb-4 flex justify-center">
              <User className="h-12 w-12" />
            </div>
            <p className="font-semibold">{approver.name}</p>
            <p className="text-sm">{approver.designation}</p>
            {approver.status && (
              <div className="mt-3 inline-block">
                <div
                  className={`h-3 w-3 rounded-full ${statusColors[approver.status]}`}
                ></div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
