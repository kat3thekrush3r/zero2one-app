"use client"

import { useState, useEffect } from "react"
import { Plus, CheckCircle2, Star, Pencil, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase"

type TeamMember = {
  id: string
  name: string
  email: string
  role: string
  phone: string
  is_primary_contact: boolean
}

export default function SettingsPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Analyst",
    phone: "",
    is_primary_contact: false,
  })

  const supabase = createClient()

  // Fetch team members on load
  useEffect(() => {
    fetchTeamMembers()
  }, [])

  async function fetchTeamMembers() {
    setLoading(true)
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .order("created_at", { ascending: true })

    if (error) {
      console.error("Error fetching team members:", error)
    } else {
      setTeamMembers(data || [])
    }
    setLoading(false)
  }

  async function handleAddMember() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase.from("team_members").insert({
      user_id: user.id,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      phone: formData.phone,
      is_primary_contact: formData.is_primary_contact,
    })

    if (error) {
      console.error("Error adding team member:", error)
    } else {
      setShowAddModal(false)
      resetForm()
      fetchTeamMembers()
    }
  }

  async function handleUpdateMember() {
    if (!editingMember) return

    const { error } = await supabase
      .from("team_members")
      .update({
        name: formData.name,
        email: formData.email,
        role: formData.role,
        phone: formData.phone,
        is_primary_contact: formData.is_primary_contact,
      })
      .eq("id", editingMember.id)

    if (error) {
      console.error("Error updating team member:", error)
    } else {
      setEditingMember(null)
      resetForm()
      fetchTeamMembers()
    }
  }

  async function handleDeleteMember(id: string) {
    if (!confirm("Are you sure you want to remove this team member?")) return

    const { error } = await supabase.from("team_members").delete().eq("id", id)

    if (error) {
      console.error("Error deleting team member:", error)
    } else {
      fetchTeamMembers()
    }
  }

  async function handleSetPrimary(id: string) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    // First, unset all primary contacts for this user
    await supabase
      .from("team_members")
      .update({ is_primary_contact: false })
      .eq("user_id", user.id)

    // Then set the selected one as primary
    await supabase
      .from("team_members")
      .update({ is_primary_contact: true })
      .eq("id", id)

    fetchTeamMembers()
  }

  function resetForm() {
    setFormData({
      name: "",
      email: "",
      role: "Analyst",
      phone: "",
      is_primary_contact: false,
    })
  }

  function openEditModal(member: TeamMember) {
    setEditingMember(member)
    setFormData({
      name: member.name,
      email: member.email,
      role: member.role,
      phone: member.phone,
      is_primary_contact: member.is_primary_contact,
    })
  }

  const roles = ["Admin", "Manager", "Accountant", "Analyst"]

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Team Section */}
      <Card className="border border-white/10 shadow-xl bg-white/[0.03] backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl text-white">Team</CardTitle>
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-[#7FFF7F] to-[#00CED1] hover:opacity-90 text-slate-900 font-semibold shadow-lg shadow-emerald-500/20"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center text-white/50">Loading...</div>
          ) : teamMembers.length === 0 ? (
            <div className="p-8 text-center text-white/50">
              No team members yet. Click "Add User" to get started.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/[0.05] border-y border-white/10">
                  <tr>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-white/60">Name</th>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-white/60">Email</th>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-white/60">Role</th>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-white/60">Phone</th>
                    <th className="text-left py-3 px-6 text-sm font-semibold text-white/60">Primary</th>
                    <th className="text-right py-3 px-6 text-sm font-semibold text-white/60">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {teamMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-white/[0.05] transition-colors">
                      <td className="py-4 px-6 text-sm font-medium text-white">{member.name}</td>
                      <td className="py-4 px-6 text-sm text-white/70">{member.email}</td>
                      <td className="py-4 px-6 text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#7FFF7F]/10 text-[#7FFF7F] border border-[#7FFF7F]/20">
                          {member.role}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-white/70">{member.phone}</td>
                      <td className="py-4 px-6">
                        <button onClick={() => handleSetPrimary(member.id)}>
                          <Star
                            className={`w-5 h-5 ${
                              member.is_primary_contact
                                ? "fill-[#7FFF7F] text-[#7FFF7F]"
                                : "text-white/30 hover:text-[#7FFF7F]"
                            }`}
                          />
                        </button>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => openEditModal(member)}
                          className="text-white/50 hover:text-white p-1 mr-2"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteMember(member.id)}
                          className="text-white/50 hover:text-red-400 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Modal */}
      {(showAddModal || editingMember) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1a1f2e] border border-white/10 rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">
                {editingMember ? "Edit Team Member" : "Add Team Member"}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setEditingMember(null)
                  resetForm()
                }}
                className="text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-white/70">Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/5 border-white/10 text-white mt-1"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <Label className="text-white/70">Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white/5 border-white/10 text-white mt-1"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <Label className="text-white/70">Role</Label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 text-white rounded-md px-3 py-2 mt-1"
                >
                  {roles.map((role) => (
                    <option key={role} value={role} className="bg-[#1a1f2e]">
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label className="text-white/70">Phone</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-white/5 border-white/10 text-white mt-1"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="primary"
                  checked={formData.is_primary_contact}
                  onChange={(e) => setFormData({ ...formData, is_primary_contact: e.target.checked })}
                  className="rounded"
                />
                <Label htmlFor="primary" className="text-white/70">
                  Primary contact
                </Label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingMember(null)
                    resetForm()
                  }}
                  variant="outline"
                  className="flex-1 bg-transparent border-white/20 text-white hover:bg-white/5"
                >
                  Cancel
                </Button>
                <Button
                  onClick={editingMember ? handleUpdateMember : handleAddMember}
                  className="flex-1 bg-gradient-to-r from-[#7FFF7F] to-[#00CED1] text-slate-900 font-semibold"
                >
                  {editingMember ? "Save Changes" : "Add Member"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
