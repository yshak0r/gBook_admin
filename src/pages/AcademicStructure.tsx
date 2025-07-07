import { useState } from "react";
import {
  useAcademicStructure,
  useCreateCampus,
  useCreateCollege,
  useCreateDepartment,
} from "@/hooks/useAcademicStructure";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Building, GraduationCap, Users } from "lucide-react";
import { toast } from "sonner";

const campusSchema = z.object({
  name: z.string().min(1, "Campus name is required"),
  description: z.string().optional(),
});

const collegeSchema = z.object({
  name: z.string().min(1, "College name is required"),
  campusId: z.string().min(1, "Campus is required"),
  description: z.string().optional(),
});

const departmentSchema = z.object({
  name: z.string().min(1, "Department name is required"),
  collegeId: z.string().min(1, "College is required"),
  description: z.string().optional(),
});

type CampusForm = z.infer<typeof campusSchema>;
type CollegeForm = z.infer<typeof collegeSchema>;
type DepartmentForm = z.infer<typeof departmentSchema>;

export default function AcademicStructure() {
  const [openDialog, setOpenDialog] = useState<
    "campus" | "college" | "department" | null
  >(null);
  const { data: structure, isLoading } = useAcademicStructure();
  const createCampus = useCreateCampus();
  const createCollege = useCreateCollege();
  const createDepartment = useCreateDepartment();

  const campusForm = useForm<CampusForm>({
    resolver: zodResolver(campusSchema),
    defaultValues: { name: "", description: "" },
  });

  const collegeForm = useForm<CollegeForm>({
    resolver: zodResolver(collegeSchema),
    defaultValues: { name: "", campusId: "", description: "" },
  });

  const departmentForm = useForm<DepartmentForm>({
    resolver: zodResolver(departmentSchema),
    defaultValues: { name: "", collegeId: "", description: "" },
  });

  const handleCreateCampus = async (data: CampusForm) => {
    try {
      await createCampus.mutateAsync(data);
      toast.success("Campus created successfully");
      campusForm.reset();
      setOpenDialog(null);
    } catch (error) {
      toast.error("Failed to create campus");
    }
  };

  const handleCreateCollege = async (data: CollegeForm) => {
    try {
      await createCollege.mutateAsync(data);
      toast.success("College created successfully");
      collegeForm.reset();
      setOpenDialog(null);
    } catch (error) {
      toast.error("Failed to create college");
    }
  };

  const handleCreateDepartment = async (data: DepartmentForm) => {
    try {
      await createDepartment.mutateAsync(data);
      toast.success("Department created successfully");
      departmentForm.reset();
      setOpenDialog(null);
    } catch (error) {
      toast.error("Failed to create department");
    }
  };

  if (isLoading) {
    return (
      <div className="h-full flex flex-col space-y-8 w-full">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="h-48">
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-32 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col space-y-8 w-full">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Academic Structure
          </h2>
          <p className="text-muted-foreground text-lg">
            Manage campuses, colleges, and departments
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog
            open={openDialog === "campus"}
            onOpenChange={(open) => setOpenDialog(open ? "campus" : null)}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Campus
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Campus</DialogTitle>
                <DialogDescription>
                  Add a new campus to the academic structure.
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={campusForm.handleSubmit(handleCreateCampus)}
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="campus-name">Campus Name</Label>
                  <Input
                    id="campus-name"
                    {...campusForm.register("name")}
                    placeholder="Enter campus name"
                    className="mt-2"
                  />
                  {campusForm.formState.errors.name && (
                    <p className="text-sm text-destructive mt-1">
                      {campusForm.formState.errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="campus-description">
                    Description (Optional)
                  </Label>
                  <Textarea
                    id="campus-description"
                    {...campusForm.register("description")}
                    placeholder="Enter campus description"
                    className="mt-2"
                  />
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpenDialog(null)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={createCampus.isPending}>
                    {createCampus.isPending ? "Creating..." : "Create Campus"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog
            open={openDialog === "college"}
            onOpenChange={(open) => setOpenDialog(open ? "college" : null)}
          >
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add College
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-md">
              <DialogHeader>
                <DialogTitle>Create New College</DialogTitle>
                <DialogDescription>
                  Add a new college to a campus.
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={collegeForm.handleSubmit(handleCreateCollege)}
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="college-campus">Campus</Label>
                  <Select
                    onValueChange={(value) =>
                      collegeForm.setValue("campusId", value)
                    }
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select a campus" />
                    </SelectTrigger>
                    <SelectContent>
                      {structure?.map((campus) => (
                        <SelectItem key={campus.id} value={campus.id}>
                          {campus.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {collegeForm.formState.errors.campusId && (
                    <p className="text-sm text-destructive mt-1">
                      {collegeForm.formState.errors.campusId.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="college-name">College Name</Label>
                  <Input
                    id="college-name"
                    {...collegeForm.register("name")}
                    placeholder="Enter college name"
                    className="mt-2"
                  />
                  {collegeForm.formState.errors.name && (
                    <p className="text-sm text-destructive mt-1">
                      {collegeForm.formState.errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="college-description">
                    Description (Optional)
                  </Label>
                  <Textarea
                    id="college-description"
                    {...collegeForm.register("description")}
                    placeholder="Enter college description"
                    className="mt-2"
                  />
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpenDialog(null)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={createCollege.isPending}>
                    {createCollege.isPending ? "Creating..." : "Create College"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog
            open={openDialog === "department"}
            onOpenChange={(open) => setOpenDialog(open ? "department" : null)}
          >
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Department
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Department</DialogTitle>
                <DialogDescription>
                  Add a new department to a college.
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={departmentForm.handleSubmit(handleCreateDepartment)}
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="department-college">College</Label>
                  <Select
                    onValueChange={(value) =>
                      departmentForm.setValue("collegeId", value)
                    }
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select a college" />
                    </SelectTrigger>
                    <SelectContent>
                      {structure?.flatMap(
                        (campus) =>
                          campus.colleges?.map((college) => (
                            <SelectItem key={college.id} value={college.id}>
                              {college.name} ({campus.name})
                            </SelectItem>
                          )) || []
                      )}
                    </SelectContent>
                  </Select>
                  {departmentForm.formState.errors.collegeId && (
                    <p className="text-sm text-destructive mt-1">
                      {departmentForm.formState.errors.collegeId.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="department-name">Department Name</Label>
                  <Input
                    id="department-name"
                    {...departmentForm.register("name")}
                    placeholder="Enter department name"
                    className="mt-2"
                  />
                  {departmentForm.formState.errors.name && (
                    <p className="text-sm text-destructive mt-1">
                      {departmentForm.formState.errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="department-description">
                    Description (Optional)
                  </Label>
                  <Textarea
                    id="department-description"
                    {...departmentForm.register("description")}
                    placeholder="Enter department description"
                    className="mt-2"
                  />
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpenDialog(null)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={createDepartment.isPending}>
                    {createDepartment.isPending
                      ? "Creating..."
                      : "Create Department"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="flex-1 flex flex-col min-h-0 w-full">
        <CardHeader className="pb-6">
          <CardTitle className="text-foreground">Academic Hierarchy</CardTitle>
          <CardDescription>
            View and manage the complete academic structure
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 min-h-0">
          {structure && structure.length > 0 ? (
            <div className="h-full overflow-auto">
              <Accordion type="multiple" className="w-full space-y-4">
                {structure.map((campus) => (
                  <AccordionItem
                    key={campus.id}
                    value={campus.id}
                    className="border rounded-lg"
                  >
                    <AccordionTrigger className="hover:no-underline px-6 py-4">
                      <div className="flex items-center gap-4 w-full">
                        <Building className="h-6 w-6 text-primary" />
                        <div className="flex-1 text-left">
                          <span className="font-semibold text-lg text-foreground">
                            {campus.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            variant="secondary"
                            className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                          >
                            <Users className="mr-1 h-3 w-3" />
                            {campus.studentsCount} students
                          </Badge>
                          <Badge variant="outline">
                            {campus.collegesCount} colleges
                          </Badge>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <div className="pl-10 space-y-4">
                        {campus.description && (
                          <p className="text-sm text-muted-foreground">
                            {campus.description}
                          </p>
                        )}
                        {campus.colleges && campus.colleges.length > 0 ? (
                          <Accordion
                            type="multiple"
                            className="w-full space-y-2"
                          >
                            {campus.colleges.map((college) => (
                              <AccordionItem
                                key={college.id}
                                value={college.id}
                                className="border rounded-md"
                              >
                                <AccordionTrigger className="hover:no-underline px-4 py-3">
                                  <div className="flex items-center gap-3 w-full">
                                    <GraduationCap className="h-5 w-5 text-blue-600" />
                                    <div className="flex-1 text-left">
                                      <span className="font-medium text-foreground">
                                        {college.name}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Badge
                                        variant="secondary"
                                        className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                      >
                                        <Users className="mr-1 h-3 w-3" />
                                        {college.studentsCount} students
                                      </Badge>
                                      <Badge
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        {college.departmentsCount} departments
                                      </Badge>
                                    </div>
                                  </div>
                                </AccordionTrigger>
                                <AccordionContent className="px-4 pb-3">
                                  <div className="pl-8 space-y-3">
                                    {college.description && (
                                      <p className="text-sm text-muted-foreground">
                                        {college.description}
                                      </p>
                                    )}
                                    {college.departments &&
                                    college.departments.length > 0 ? (
                                      <div className="space-y-2">
                                        {college.departments.map(
                                          (department) => (
                                            <div
                                              key={department.id}
                                              className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border"
                                            >
                                              <div className="flex items-center gap-3">
                                                <div className="h-2 w-2 rounded-full bg-green-500" />
                                                <span className="text-sm font-medium text-foreground">
                                                  {department.name}
                                                </span>
                                                {department.description && (
                                                  <span className="text-xs text-muted-foreground">
                                                    - {department.description}
                                                  </span>
                                                )}
                                              </div>
                                              <Badge
                                                variant="outline"
                                                className="text-xs"
                                              >
                                                <Users className="mr-1 h-3 w-3" />
                                                {department.studentsCount}{" "}
                                                students
                                              </Badge>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    ) : (
                                      <p className="text-sm text-muted-foreground">
                                        No departments found
                                      </p>
                                    )}
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            ))}
                          </Accordion>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            No colleges found
                          </p>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center py-12">
                <Building className="mx-auto h-16 w-16 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium text-foreground">
                  No academic structure found
                </h3>
                <p className="text-muted-foreground">
                  Start by creating your first campus.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
