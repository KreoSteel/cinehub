import Button from "@/app/shared/ui/Button";

export default function MobileNavAuthActions() {
  return (
    <>
      <Button className="bg-amber text-surface">
        <p className="mx-auto">Sign in</p>
      </Button>
      <Button className="border border-foreground/40">
        <p className="mx-auto">Create account</p>
      </Button>
    </>
  )
}
