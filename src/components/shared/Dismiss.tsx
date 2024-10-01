export default function Dismiss({ toggleOff }: any) {
    const handleToggle = () => {
      toggleOff();
    };
    return (
      <button
        onClick={handleToggle}
        className="fixed top-0 bottom-0 right-0 left-0 bg-gray-200 h-full w-full opacity-0 cursor-default"
      ></button>
    );
  }