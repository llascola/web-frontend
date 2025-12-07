import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import PostOne from "../posts/server-architecture.mdx";

const BlogSection = () => {
    return (
        <section id="blog" className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Latest Articles</h2>
                    <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                        Thoughts on technology, software architecture, and development best practices.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Featured Post (using the MDX component) */}
                    <Card className="md:col-span-2 overflow-hidden hover:shadow-lg transition-shadow">
                        <CardHeader className="bg-white border-b border-slate-100">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-blue-600">Featured</span>
                                <span className="text-sm text-slate-500">Dec 6, 2025</span>
                            </div>
                            <CardTitle className="text-2xl">Server Architecture Insights</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-slate max-w-none p-6">
                            <div className="max-h-60 overflow-hidden relative">
                                <PostOne />
                                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
                            </div>
                            <div className="mt-4 text-center">
                                <Button variant="link" className="gap-1">Read Full Article <ArrowRight size={16} /></Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Placeholder for more posts */}
                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <span className="text-sm text-slate-500 mb-2">Nov 28, 2025</span>
                            <CardTitle>Understanding React Server Components</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-slate-600 mb-4">
                                A deep dive into how RSCs change the way we build React applications...
                            </p>
                            <Button variant="link" className="p-0 h-auto gap-1">Read More <ArrowRight size={16} /></Button>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <span className="text-sm text-slate-500 mb-2">Nov 15, 2025</span>
                            <CardTitle>Optimizing Go for High Throughput</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-slate-600 mb-4">
                                Tips and tricks for squeezing every bit of performance out of your Go services...
                            </p>
                            <Button variant="link" className="p-0 h-auto gap-1">Read More <ArrowRight size={16} /></Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
