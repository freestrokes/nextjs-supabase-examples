import React, { useEffect, useState, useMemo } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useBoardStore } from '@/store/useBoardStore';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  SlidersHorizontal, 
  ExternalLink, 
  ArrowUpDown,
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';

const BoardListPage = () => {
  const { posts, fetchPosts, isLoading } = useBoardStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author_name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [posts, searchQuery]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredPosts.map(p => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const isAllSelected = filteredPosts.length > 0 && selectedIds.length === filteredPosts.length;

  return (
    <Layout>
      <div className="space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Tasks Management</h2>
            <p className="text-sm text-muted-foreground">
              Here&apos;s a list of all administrative tasks and recorded issues.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/board/write">
              <Button size="sm" className="h-9 gap-2 text-xs">
                <Plus className="h-4 w-4" />
                <span>New Task</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Filter Toolbar (shadcn Tasks style) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-1 items-center gap-2 w-full sm:max-w-sm">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Filter tasks by title or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-9 text-xs"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Button variant="outline" size="sm" className="h-9 gap-2 text-xs border-dashed">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>Status</span>
              <Badge variant="secondary" className="ml-1 rounded-sm px-1 font-normal text-[10px]">
                Active
              </Badge>
            </Button>
            <Button variant="outline" size="sm" className="h-9 gap-2 text-xs">
              <FileSpreadsheet className="h-3.5 w-3.5" />
              <span>Export</span>
            </Button>
          </div>
        </div>

        {/* Data Table */}
        <div className="rounded-md border border-border bg-card shadow-xs">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="w-10">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="h-4 w-4 rounded border-input text-primary focus:ring-ring cursor-pointer"
                    aria-label="Select all"
                  />
                </TableHead>
                <TableHead className="w-24">Task ID</TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    <span>Title</span>
                    <ArrowUpDown className="h-3 w-3 text-muted-foreground" />
                  </div>
                </TableHead>
                <TableHead className="w-32">Status</TableHead>
                <TableHead className="w-40">Author</TableHead>
                <TableHead className="w-32">Created</TableHead>
                <TableHead className="w-20 text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array(5).fill(0).map((_, i) => (
                  <TableRow key={i} className="animate-pulse">
                    <TableCell><div className="h-4 w-4 bg-muted rounded" /></TableCell>
                    <TableCell><div className="h-4 w-16 bg-muted rounded" /></TableCell>
                    <TableCell><div className="h-4 w-48 bg-muted rounded" /></TableCell>
                    <TableCell><div className="h-5 w-16 bg-muted rounded" /></TableCell>
                    <TableCell><div className="h-4 w-24 bg-muted rounded" /></TableCell>
                    <TableCell><div className="h-4 w-20 bg-muted rounded" /></TableCell>
                    <TableCell><div className="h-4 w-8 bg-muted rounded ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : filteredPosts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-40 text-center text-muted-foreground">
                    No results found matching your criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredPosts.map((post, idx) => {
                  const isSelected = selectedIds.includes(post.id);
                  const initial = (post.author_name?.slice(0, 1) || 'A').toUpperCase();
                  const taskId = `TSK-${1000 + idx}`;
                  const formattedDate = new Date(post.created_at).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  });

                  return (
                    <TableRow 
                      key={post.id}
                      data-state={isSelected ? "selected" : undefined}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectOne(post.id)}
                          className="h-4 w-4 rounded border-input text-primary focus:ring-ring cursor-pointer"
                          aria-label={`Select ${post.title}`}
                        />
                      </TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground font-semibold">
                        {taskId}
                      </TableCell>
                      <TableCell>
                        <Link 
                          href={`/board/${post.id}`}
                          className="font-medium text-foreground hover:underline flex items-center gap-2 group"
                        >
                          <span className="truncate max-w-[320px] lg:max-w-[480px]">
                            {post.title}
                          </span>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="gap-1.5 font-normal text-xs py-0.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Done
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar size="sm" className="h-6 w-6">
                            <AvatarFallback className="text-[10px] font-bold">
                              {initial}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground truncate">
                            {post.author_name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {formattedDate}
                      </TableCell>
                      <TableCell className="text-right">
                        <Link href={`/board/${post.id}`}>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        {/* Table Footer Info */}
        <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
          <div>
            {selectedIds.length} of {filteredPosts.length} row(s) selected.
          </div>
          <div className="flex items-center gap-2">
            <span>Page 1 of 1</span>
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default BoardListPage;
