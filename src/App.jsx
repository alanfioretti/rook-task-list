import { useState, useRef, useEffect } from "react";
import "./index.css";

const personalities = {
  gremlin: {
    name: "gremlin",
    reactions: {
      add: [
        "ugh fine, I'll track that.",
        "added. happy now?",
        "task logged. chaos continues.",
        "sure, let's PRETEND we're productive today.",
        "added. don't expect praise.",
      ],
      remove: [
        "deleted. good riddance.",
        "task annihilated.",
        "poof. gone. like my patience.",
        "removed. may it rest in crumbs.",
      ],
    },
  },

  corporate: {
    name: "corporate",
    reactions: {
      add: [
        "Task successfully registered.",
        "Logging action into dashboard…",
        "Acknowledged. Productivity: increasing.",
        "New objective added to workflow.",
      ],
      remove: [
        "Task removed from active queue.",
        "Objective cleared.",
        "Deletion logged for auditing purposes.",
        "Compliance updated: ✓",
      ],
    },
  },

  puppy: {
    name: "Golden Retriever",
    reactions: {
      add: [
        "YAAAY! You added a task!! :D",
        "Awesome job!! Keep going!!",
        "Woohoo! You're crushing it!! 💖",
        "Another win!!! Proud of you!!",
      ],
      remove: [
        "Aww okay! Goodbye little task!!",
        "Poof!! You're doing amazing!!",
        "You cleaned something up!! NICE!!",
        "One less thing!! You're unstoppable!!",
      ],
    },
  },
};

export default function App() {
  const scrollRef = useRef(null);

  const [tasks, setTasks] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [input, setInput] = useState("");
  const [personality, setPersonality] = useState("gremlin");
  const [message, setMessage] = useState("SYSTEM READY.");
  const [showCompleted, setShowCompleted] = useState(false);
  const [shouldScroll, setShouldScroll] = useState(true);

  const scrollToBottom = () => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollTo({
      top: el.scrollHeight,
      behavior: "smooth",
    });
  };

  const scrollToTop = () => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (shouldScroll) scrollToBottom();
  }, [tasks, message]);

  useEffect(() => {
    if (showCompleted) scrollToTop();
    else scrollToBottom();
  }, [showCompleted]);

  const handleAdd = () => {
    if (!input.trim()) {
      setMessage("ERROR: EMPTY INPUT. TRY AGAIN.");
      return;
    }

    setTasks([...tasks, input.trim()]);
    setShouldScroll(true);

    const reaction = random(personalities[personality].reactions.add);
    setMessage(reaction);

    setInput("");
  };

  const handleComplete = (index) => {
    const el = scrollRef.current;

    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 5;

    if (atBottom) {
      setShouldScroll(true);
    } else {
      setShouldScroll(false);
      el.scrollBy({ top: 60, behavior: "smooth" });
    }

    const task = tasks[index];

    setTasks(tasks.filter((_, i) => i !== index));
    setCompleted([...completed, task]);

    const reaction = random(personalities[personality].reactions.remove);
    setMessage(reaction);
  };

  const handleRestore = (index) => {
    const task = completed[index];

    setCompleted(completed.filter((_, i) => i !== index));
    setTasks([...tasks, task]);

    setShouldScroll(false);
    setMessage("TASK RESTORED.");
  };

  return (
    <div className="terminal">
      <div className="header">
        rook-task-list.exe — personality mode:{" "}
        <span className="accent">{personalities[personality].name}</span>
      </div>
      <div className="line"> {message}</div>

      <div className="scroll-area" ref={scrollRef}>
        <div className="screen">

          {showCompleted && (
            <div className="completed-section">
              <div className="line accent">COMPLETED TASKS:</div>
              <ul className="tasks completed">
                {completed.map((t, i) => (
                  <li key={i} className="task">
                    [x] {t}
                    <span className="restore" onClick={() => handleRestore(i)}>
                      [restore]
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="line accent">ACTIVE TASKS:</div>
          <ul className="tasks">
            {tasks.map((t, i) => (
              <li key={i} className="task">
                {i + 1}. {t}
                <span className="remove" onClick={() => handleComplete(i)}>
                  [-]
                </span>
              </li>
            ))}
          </ul>

          <div className="input-line">
            <span>&gt;</span>{" "}
            <input
              value={input}
              placeholder="Type a task and press Enter…"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              className="term-input"
            />
          </div>
        </div>
      </div>

      <div className="buttons">
        <button onClick={() => setPersonality("gremlin")}>Gremlin</button>
        <button onClick={() => setPersonality("corporate")}>Corporate</button>
        <button onClick={() => setPersonality("puppy")}>Puppy</button>

        <div className="spacer"></div>

        <button
          className="completed-toggle"
          onClick={() => setShowCompleted(!showCompleted)}
        >
          {showCompleted ? "Hide Completed" : "Show Completed"}
        </button>
      </div>
    </div>
  );
}

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
