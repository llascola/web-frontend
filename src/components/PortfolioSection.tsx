import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const PortfolioSection = () => {
    const projects = [
        {
            title: "E-Commerce Platform",
            description: "A full-featured online store built with Next.js, Go, and Stripe integration.",
            tags: ["Next.js", "Go", "PostgreSQL", "Stripe"],
            image: "bg-blue-100", // Placeholder class
            demoLink: "#",
            repoLink: "#",
        },
        {
            title: "Task Management App",
            description: "Real-time collaboration tool for teams with Kanban boards and chat.",
            tags: ["React", "Firebase", "Tailwind"],
            image: "bg-green-100", // Placeholder class
            demoLink: "#",
            repoLink: "#",
        },
        {
            title: "Server Monitor Dashboard",
            description: "The dashboard you can see in this app! Real-time server metrics visualization.",
            tags: ["React", "Recharts", "WebSockets"],
            image: "bg-purple-100", // Placeholder class
            demoLink: "/dashboard",
            repoLink: "#",
        },
    ];

    return (
        <section id="portfolio" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">My Portfolio</h2>
                    <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                        Here are some of the projects I've worked on. Each one presented unique challenges and learning opportunities.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <Card key={index} className="overflow-hidden border border-slate-200 hover:border-blue-300 transition-all hover:shadow-xl flex flex-col">
                            <div className={`h-48 w-full ${project.image} flex items-center justify-center text-slate-400`}>
                                {/* Placeholder for project screenshot */}
                                <span className="font-semibold">Project Image</span>
                            </div>
                            <CardHeader>
                                <CardTitle>{project.title}</CardTitle>
                                <CardDescription>{project.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full font-medium">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="flex gap-4 border-t border-slate-100 pt-4">
                                <a href={project.demoLink} className="flex-1">
                                    <Button variant="outline" size="sm" className="w-full gap-2">
                                        <ExternalLink size={16} /> Demo
                                    </Button>
                                </a>
                                <a href={project.repoLink} className="flex-1">
                                    <Button variant="ghost" size="sm" className="w-full gap-2">
                                        <Github size={16} /> Code
                                    </Button>
                                </a>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PortfolioSection;
