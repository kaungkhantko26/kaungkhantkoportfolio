import Link from "next/link";
import { useDispatch } from "react-redux";
import { animationActions } from "../../store/animationSlice";

export default function HomeButton() {
  const dispatch = useDispatch();

  return (
    <Link href="/" alt="home">
      <a
        onMouseEnter={() => dispatch(animationActions.hideCursor())}
        onMouseLeave={() => dispatch(animationActions.removeState())}
        aria-label='home button'
      >
        <svg
          width="88"
          height="75"
          viewBox="0 0 88 75"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M44 0L87.3013 75H0.69873L44 0Z" fill="#1E1E1E" />
        </svg>
      </a>
    </Link>
  );
}
