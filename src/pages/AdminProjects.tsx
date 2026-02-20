import { useState, useEffect } from "react";
import { supabase, Project } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Plus, ExternalLink, Github, ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

const ICON_OPTIONS = [
  "Layers", "Terminal", "Code2", "Sparkles", "ExternalLink", 
  "Github", "Database", "Server", "Smartphone", "Cloud"
];

const COLOR_OPTIONS = [
  "from-blue-500 via-indigo-500 to-violet-500",
  "from-emerald-400 via-teal-500 to-cyan-500",
  "from-orange-400 via-amber-500 to-yellow-500",
  "from-pink-400 via-rose-500 to-red-500",
  "from-sky-400 via-blue-500 to-indigo-500",
  "from-purple-500 via-pink-500 to-rose-500",
  "from-green-400 via-emerald-500 to-teal-500",
  "from-red-400 via-orange-500 to-amber-500",
];

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    long_description: "",
    tags: "",
    color: COLOR_OPTIONS[0],
    icon: ICON_OPTIONS[0],
    github: "#",
    demo: "#",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error fetching projects", description: error.message, variant: "destructive" });
    } else {
      setProjects(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const projectData = {
      title: formData.title,
      description: formData.description,
      long_description: formData.long_description,
      tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
      color: formData.color,
      icon: formData.icon,
      github: formData.github || "#",
      demo: formData.demo || "#",
    };

    let error;

    if (editingProject) {
      const { error: updateError } = await supabase
        .from("projects")
        .update(projectData)
        .eq("id", editingProject.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from("projects")
        .insert(projectData);
      error = insertError;
    }

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({
        title: editingProject ? "Project updated" : "Project created",
        description: `${formData.title} has been ${editingProject ? "updated" : "added"} successfully.`,
      });
      resetForm();
      fetchProjects();
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      long_description: project.long_description || "",
      tags: project.tags?.join(", ") || "",
      color: project.color,
      icon: project.icon,
      github: project.github,
      demo: project.demo,
    });
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
      toast({ title: "Error deleting project", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Project deleted", description: "The project has been removed." });
      fetchProjects();
    }
  };

  const resetForm = () => {
    setOpen(false);
    setEditingProject(null);
    setFormData({
      title: "",
      description: "",
      long_description: "",
      tags: "",
      color: COLOR_OPTIONS[0],
      icon: ICON_OPTIONS[0],
      github: "#",
      demo: "#",
    });
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Projects</h1>
            <p className="text-muted-foreground">Manage your portfolio projects</p>
          </div>
          <Link to="/admin">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { resetForm(); setOpen(true); }}>
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingProject ? "Edit Project" : "Add New Project"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Project title"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="icon">Icon</Label>
                    <select
                      id="icon"
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      {ICON_OPTIONS.map((icon) => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Short Description</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description (shown in cards)"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="long_description">Long Description</Label>
                  <Textarea
                    id="long_description"
                    value={formData.long_description}
                    onChange={(e) => setFormData({ ...formData, long_description: e.target.value })}
                    placeholder="Full description (shown in modal)"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="React, TypeScript, Web Dev"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Color Gradient</Label>
                  <div className="flex flex-wrap gap-2">
                    {COLOR_OPTIONS.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setFormData({ ...formData, color })}
                        className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} ${
                          formData.color === color ? "ring-2 ring-offset-2 ring-primary" : ""
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub URL</Label>
                    <Input
                      id="github"
                      value={formData.github}
                      onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                      placeholder="https://github.com/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="demo">Demo URL</Label>
                    <Input
                      id="demo"
                      value={formData.demo}
                      onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingProject ? "Update Project" : "Create Project"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No projects yet. Click "Add Project" to create your first project.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${project.color}`} />
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center justify-between">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags?.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {project.demo !== "#" && project.demo !== "" && (
                        <Button variant="ghost" size="icon" asChild>
                          <a href={project.demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                      {project.github !== "#" && project.github !== "" && (
                        <Button variant="ghost" size="icon" asChild>
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(project)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(project.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
