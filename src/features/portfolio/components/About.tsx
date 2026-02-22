import { Card, CardContent } from "@/components/ui/card";
import { Code, Database, Server, Layout } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { TypographyH3, TypographyMuted } from "@/components/ui/typography";

const skills = [
    {
        icon: <Code className="w-8 h-8 text-primary" />,
        title: "Frontend Development",
        description: "Building responsive and interactive UIs with React, TypeScript, and Tailwind CSS.",
    },
    {
        icon: <Server className="w-8 h-8 text-primary" />,
        title: "Backend Development",
        description: "Creating robust APIs and microservices using Go and Node.js.",
    },
    {
        icon: <Database className="w-8 h-8 text-primary" />,
        title: "Database Design",
        description: "Designing efficient schemas with PostgreSQL, MongoDB, and Redis.",
    },
    {
        icon: <Layout className="w-8 h-8 text-primary" />,
        title: "System Architecture",
        description: "Architecting scalable and maintainable software solutions.",
    },
];

const About = () => {

    return (
        <section id="about" className="py-20 bg-muted/50">
            <Container>
                <SectionHeader
                    title="About Me"
                    description="I'm a dedicated developer with a strong foundation in both frontend and backend technologies. I love solving complex problems and delivering high-quality software."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {skills.map((skill) => (
                        <Card key={skill.title} className="border-none shadow-md hover:shadow-lg transition-shadow bg-card">
                            <CardContent className="pt-6 text-center space-y-4">
                                <div className="flex justify-center">{skill.icon}</div>
                                <TypographyH3 className="text-xl">{skill.title}</TypographyH3>
                                <TypographyMuted>{skill.description}</TypographyMuted>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default About;
