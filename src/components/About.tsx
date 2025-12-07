import { Card, CardContent } from "@/components/ui/card";
import { Code, Database, Server, Layout } from "lucide-react";

const About = () => {
    const skills = [
        {
            icon: <Code className="w-8 h-8 text-blue-600" />,
            title: "Frontend Development",
            description: "Building responsive and interactive UIs with React, TypeScript, and Tailwind CSS.",
        },
        {
            icon: <Server className="w-8 h-8 text-blue-600" />,
            title: "Backend Development",
            description: "Creating robust APIs and microservices using Go and Node.js.",
        },
        {
            icon: <Database className="w-8 h-8 text-blue-600" />,
            title: "Database Design",
            description: "Designing efficient schemas with PostgreSQL, MongoDB, and Redis.",
        },
        {
            icon: <Layout className="w-8 h-8 text-blue-600" />,
            title: "System Architecture",
            description: "Architecting scalable and maintainable software solutions.",
        },
    ];

    return (
        <section id="about" className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">About Me</h2>
                    <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                        I'm a dedicated developer with a strong foundation in both frontend and backend technologies. I love solving complex problems and delivering high-quality software.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {skills.map((skill, index) => (
                        <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
                            <CardContent className="pt-6 text-center space-y-4">
                                <div className="flex justify-center">{skill.icon}</div>
                                <h3 className="text-xl font-semibold text-slate-900">{skill.title}</h3>
                                <p className="text-slate-600">{skill.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
