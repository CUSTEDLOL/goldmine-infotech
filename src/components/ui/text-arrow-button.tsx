import { ArrowRight } from "lucide-react";
import "./text-arrow-button.css";

interface TextArrowButtonProps {
  label: string;
}

const TextArrowButton = ({ label }: TextArrowButtonProps) => {
  return (
    <button className="text-arrow-btn">
      <p data-text={label}>{label}</p>
      <ArrowRight size={15} />
    </button>
  );
};

export default TextArrowButton;
