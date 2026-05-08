"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../../store/features/portfolioSlice";

const formatDate = (dateString) => {
  if (!dateString) {
    return "Not available";
  }

  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.portfolio.projects);
  const projectStatus = useSelector((state) => state.portfolio.status.projects);
  const projectError = useSelector((state) => state.portfolio.error.projects);

  useEffect(() => {
    if (projectStatus === "idle") {
      dispatch(fetchProjects());
    }
  }, [dispatch, projectStatus]);

  const project = projects.find((item) => item._id === id);
  const isLoading = projectStatus === "loading" || (projectStatus === "idle" && !project);

  if (isLoading) {
    return (
      <main className="min-h-screen px-[8%] py-24 dark:bg-darkTheme dark:text-white">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm text-gray-500 dark:text-white/70">Loading project details...</p>
        </div>
      </main>
    );
  }

  if (projectError) {
    return (
      <main className="min-h-screen px-[8%] py-24 dark:bg-darkTheme dark:text-white">
        <div className="max-w-5xl mx-auto space-y-4">
          <Link
            href="/#projects"
            className="inline-flex rounded-full border border-gray-400 px-5 py-2 text-sm transition hover:bg-gray-100 dark:border-white/50 dark:hover:bg-darkHover"
          >
            Back to projects
          </Link>
          <p className="text-red-500">{projectError}</p>
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="min-h-screen px-[8%] py-24 dark:bg-darkTheme dark:text-white">
        <div className="max-w-5xl mx-auto space-y-4">
          <Link
            href="/#projects"
            className="inline-flex rounded-full border border-gray-400 px-5 py-2 text-sm transition hover:bg-gray-100 dark:border-white/50 dark:hover:bg-darkHover"
          >
            Back to projects
          </Link>
          <h1 className="text-3xl font-Ovo">Project not found</h1>
          <p className="text-gray-600 dark:text-white/70">
            The project you are looking for is not available right now.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-[8%] py-24 dark:bg-darkTheme dark:text-white">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/#projects"
          className="inline-flex rounded-full border border-gray-400 px-5 py-2 text-sm transition hover:bg-gray-100 dark:border-white/50 dark:hover:bg-darkHover"
        >
          Back to projects
        </Link>

        <section className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="relative min-h-[280px] overflow-hidden rounded-3xl border border-black/10 bg-gray-100 shadow-sm dark:border-white/10 dark:bg-darkHover">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500 dark:text-white/60">
                Project Details
              </p>
              <h1 className="mt-3 text-4xl font-Ovo leading-tight">{project.title}</h1>
              <p className="mt-4 text-base leading-7 text-gray-700 dark:text-white/75">
                {project.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-darkHover">
                <p className="text-sm text-gray-500 dark:text-white/60">Likes</p>
                <p className="mt-2 text-2xl font-semibold">{project.likes ?? 0}</p>
              </div>
              <div className="rounded-2xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-darkHover">
                <p className="text-sm text-gray-500 dark:text-white/60">Comments</p>
                <p className="mt-2 text-2xl font-semibold">{project.comments ?? 0}</p>
              </div>
              <div className="rounded-2xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-darkHover col-span-2">
                <p className="text-sm text-gray-500 dark:text-white/60">Created</p>
                <p className="mt-2 text-lg font-medium">{formatDate(project.createdAt)}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {project.demoLink && (
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-black px-6 py-3 text-sm text-white transition hover:opacity-85 dark:bg-white dark:text-black"
                >
                  Live Demo
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-black/20 px-6 py-3 text-sm transition hover:bg-gray-100 dark:border-white/30 dark:hover:bg-darkHover"
                >
                  GitHub Repo
                </a>
              )}
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-darkHover">
          <h2 className="text-2xl font-Ovo">Tech Stack</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {project.techStack?.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-black/10 bg-gray-50 px-4 py-2 text-sm dark:border-white/10 dark:bg-darkTheme"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
