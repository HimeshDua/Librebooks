import { Moon, Sun, Laptop } from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { toast } from "sonner";

export function ThemeToggleButton() {
  const { theme, setTheme, systemTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;

  const toggleTheme = () => {
    const nextTheme =
      theme === "light" ? "dark" : theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);

    setTimeout(() => {
      toast.info('Refresh the page after changing theme', {
        duration: 3000,
      });
    }, 300);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      title={`Switch to ${currentTheme === "dark" ? "light" : "dark"
        } theme`}
      className="h-9 w-9 rounded-full hover:bg-muted transition"
    >
      {currentTheme === "light" ? (
        <Moon className="w-4 h-4" />
      ) : currentTheme === "dark" ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Laptop className="w-4 h-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
