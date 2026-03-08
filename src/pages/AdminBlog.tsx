import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import RichTextEditor from "@/components/RichTextEditor";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, LogOut, Eye } from "lucide-react";
import koreiqLogo from "@/assets/koreiq-logo.png";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  author: string;
  published: boolean;
  published_at: string | null;
  created_at: string;
}

const emptyPost = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  cover_image: "",
  author: "KoreIQ Team",
  published: false,
};

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<typeof emptyPost & { id?: string }>(emptyPost);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchPosts();
  }, []);

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin/login");
      return;
    }
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      await supabase.auth.signOut();
      navigate("/admin/login");
    }
  }

  async function fetchPosts() {
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    setPosts((data as BlogPost[]) || []);
    setLoading(false);
  }

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }

  function openNew() {
    setEditingPost(emptyPost);
    setDialogOpen(true);
  }

  function openEdit(post: BlogPost) {
    setEditingPost({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      cover_image: post.cover_image || "",
      author: post.author,
      published: post.published,
    });
    setDialogOpen(true);
  }

  async function handleSave() {
    if (!editingPost.title || !editingPost.excerpt || !editingPost.content) {
      toast({ title: "Missing fields", description: "Title, excerpt, and content are required.", variant: "destructive" });
      return;
    }

    setSaving(true);
    const slug = editingPost.slug || generateSlug(editingPost.title);
    const payload = {
      title: editingPost.title,
      slug,
      excerpt: editingPost.excerpt,
      content: editingPost.content,
      cover_image: editingPost.cover_image || null,
      author: editingPost.author || "KoreIQ Team",
      published: editingPost.published,
      published_at: editingPost.published ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    };

    let error;
    if (editingPost.id) {
      ({ error } = await supabase.from("blog_posts").update(payload).eq("id", editingPost.id));
    } else {
      ({ error } = await supabase.from("blog_posts").insert(payload));
    }

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: editingPost.id ? "Post updated" : "Post created" });
      setDialogOpen(false);
      fetchPosts();
    }
    setSaving(false);
  }

  async function handleDelete() {
    if (!deleteId) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", deleteId);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Post deleted" });
      fetchPosts();
    }
    setDeleteId(null);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/admin/login");
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={koreiqLogo} alt="KoreIQ" className="h-8 w-auto bg-white/90 rounded-md px-2 py-1" />
            <span className="font-display font-semibold text-sm">Blog Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <a href="/blog" target="_blank" className="flex items-center gap-1">
                <Eye className="h-4 w-4" /> View Blog
              </a>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="flex items-center gap-1">
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-display font-bold">Blog Posts</h1>
          <Button onClick={openNew} className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> New Post
          </Button>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading…</p>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground mb-4">No blog posts yet.</p>
            <Button onClick={openNew}>Create Your First Post</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="glass-card">
                <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display font-semibold truncate">{post.title}</h3>
                      <Badge variant={post.published ? "default" : "secondary"}>
                        {post.published ? "Published" : "Draft"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{post.excerpt}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {post.author} · {new Date(post.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(post)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setDeleteId(post.id)} className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display">
              {editingPost.id ? "Edit Post" : "New Post"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={editingPost.title}
                onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value, slug: editingPost.id ? editingPost.slug : generateSlug(e.target.value) })}
                placeholder="Post title"
              />
            </div>
            <div className="space-y-2">
              <Label>Slug</Label>
              <Input
                value={editingPost.slug}
                onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                placeholder="post-url-slug"
              />
            </div>
            <div className="space-y-2">
              <Label>Author</Label>
              <Input
                value={editingPost.author}
                onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Cover Image URL</Label>
              <Input
                value={editingPost.cover_image}
                onChange={(e) => setEditingPost({ ...editingPost, cover_image: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <Label>Excerpt</Label>
              <Textarea
                value={editingPost.excerpt}
                onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                placeholder="Brief summary shown on cards"
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label>Content (HTML)</Label>
              <Textarea
                value={editingPost.content}
                onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                placeholder="<p>Your blog post content...</p>"
                rows={12}
                className="font-mono text-sm"
              />
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={editingPost.published}
                onCheckedChange={(checked) => setEditingPost({ ...editingPost, published: checked })}
              />
              <Label>Publish immediately</Label>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Saving…" : editingPost.id ? "Update" : "Create"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this post?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
