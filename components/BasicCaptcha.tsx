import { useRef, useEffect, FC, useState } from "react";

type Props = {
  setCaptchaIsMatching: React.Dispatch<React.SetStateAction<boolean>>;
  captchaError: string;
};

const BasicCaptcha: FC<Props> = ({ setCaptchaIsMatching, captchaError }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [numbers, setNumbers] = useState<string>("");
  const [userNumbers, setUserNumbers] = useState<string>("");

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (canvas && context) {
      const randomNumbers = [];
      for (let i = 0; i < 4; i++) {
        randomNumbers.push(Math.floor(Math.random() * 10));
      }
      setNumbers(`${randomNumbers.join("")}`);

      context.fillStyle = "#272727"; // Background color
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.font = "48px Arial"; // Font size and type
      context.fillStyle = "#6D67E4"; // Text color

      randomNumbers.forEach((number, index) => {
        const xPos = index * 50 + 20; // X position of each digit
        const yPos = canvas.height / 2 + 15; // Y position of each digit

        context.fillText(number.toString(), xPos, yPos);
      });
    }
  }, []);

  return (
    <>
      <canvas ref={canvasRef} width={220} height={100} />
      <input
        placeholder={"What are the numbers on the picture?"}
        className={`block w-full border border-transparent border-b-white bg-transparent py-1.5 
           text-white ring-0 transition-colors hover:border-b-win-primary focus:border-white focus:outline-none focus:ring-0 sm:text-sm sm:leading-6`}
        type="text"
        value={userNumbers}
        onChange={(e) => {
          setUserNumbers(e.target.value);
          setCaptchaIsMatching(numbers === e.target.value);
        }}
      />
      {captchaError && (
        <p
          className="mt-2 text-sm text-red-600"
          id={`${captchaError}-captcha-error`}
        >
          {captchaError}
        </p>
      )}
    </>
  );
};

export default BasicCaptcha;
