"use client";

import ProjectForm from "@/components/ProjectForm";
import { useParams } from "next/navigation";

export default function EditProject() {
  const params = useParams();
  const projectId = parseInt(params.id as string);

  return <ProjectForm projectId={projectId} />;
}
