export default function ButtonsDiv({ robot, updateRobot }) {
  return (
    <>
      <div className="buttonsDiv">
        <p className="lowerText">Human opponent</p>
        <RobotSwitch robot={robot} updateRobot={updateRobot} />
        <p className="lowerText">AI opponent</p>
      </div>
      <DifficultySelection
        robot={robot}
        updateRobot={updateRobot}
        key="difficultySelection"
      />
    </>
  );
}

function RobotSwitch({ robot, updateRobot }) {
  let checked = "";
  if (robot) {
    checked = "checked";
  }
  return (
    <label className="switch">
      <input type="checkbox" checked={checked} onChange={clicked} />
      <span className="slider round"></span>
    </label>
  );

  function clicked(event) {
    if (event.target.checked) {
      updateRobot(1);
    } else {
      updateRobot(0);
    }
  }
}

function DifficultySelection({ robot, updateRobot }) {
  if (robot === 0) return;
  let checked = Array(4).fill("");
  checked[robot - 1] = "checked";
  const difficulties = ["Easy", "Medium", "Hard", "Master"];
  let radioBoxes = [];
  for (let i = 0; i < 4; i++) {
    radioBoxes.push(
      <label htmlFor={i + 1} key={i + 1 + "label"}>
        {difficulties[i]}
        <br />
        <input
          type="radio"
          id={i + 1}
          name={difficulties[i]}
          value={i + 1}
          checked={checked[i]}
          onClick={choseDifficulty}
          onChange={choseDifficulty}
          key={i + 1 + "input"}
        />
      </label>
    );
  }

  return (
    <div className="slidecontainer">
      <p>Select bot difficulty:</p>
      {radioBoxes}
    </div>
  );

  function choseDifficulty(event) {
    updateRobot(event.target.value);
  }
}
