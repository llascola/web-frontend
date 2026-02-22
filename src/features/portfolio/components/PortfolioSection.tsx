import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { TypographyH3, TypographyMuted } from "@/components/ui/typography";

const projects = [
    {
        title: "E-Commerce Platform",
        description: "A full-featured online store built with Next.js, Go, and Stripe integration.",
        tags: ["Next.js", "Go", "PostgreSQL", "Stripe"],
        image: "bg-primary/20", // Placeholder class
        demoLink: "#",
        repoLink: "#",
    },
    {
        title: "Task Management App",
        description: "Real-time collaboration tool for teams with Kanban boards and chat.",
        tags: ["React", "Firebase", "Tailwind"],
        image: "bg-muted", // Placeholder class
        demoLink: "#",
        repoLink: "#",
    },
    {
        title: "Server Monitor Dashboard",
        description: "The dashboard you can see in this app! Real-time server metrics visualization.",
        tags: ["React", "Recharts", "WebSockets"],
        image: "bg-primary/20", // Themed placeholder
        demoLink: "/dashboard",
        repoLink: "#",
    },
];

const PortfolioSection = () => {

    return (
        <section id="portfolio" className="py-20 bg-background">
            <Container>
                <SectionHeader
                    title="My Portfolio"
                    description="Here are some of the projects I've worked on. Each one presented unique challenges and learning opportunities."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <Card key={project.title} className="overflow-hidden border border-border hover:border-primary/50 transition-all hover:shadow-xl flex flex-col bg-card">
                            <div className={`h-48 w-full ${project.image} flex items-center justify-center text-muted-foreground`}>
                                {/* Placeholder for project screenshot */}
                                <span className="font-semibold">Project Image</span>
                            </div>
                            <CardHeader>
                                <TypographyH3>{project.title}</TypographyH3>
                                <TypographyMuted>{project.description}</TypographyMuted>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full font-medium">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="flex gap-4 border-t border-border pt-4">
                                <Button asChild variant="outline" size="sm" className="flex-1 gap-2">
                                    <a href={project.demoLink}>
                                        <ExternalLink size={16} /> Demo
                                    </a>
                                </Button>
                                <Button asChild variant="ghost" size="sm" className="flex-1 gap-2">
                                    <a href={project.repoLink}>
                                        <Github size={16} /> Code
                                    </a>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default PortfolioSection;
