import {useState } from "react";

function DeleteTask(
  ObjList: { listToDo: { name: string; verified: boolean }[] }[],
  setObjList: Function,
  index1: number,
  index2: number
) {
  let ProtoObj = [...ObjList];
  ProtoObj[index1].listToDo.splice(index2, 1);
  setObjList(ProtoObj);
}

function ClearCompleted(
  index1: number,
  ObjList: { listToDo: { name: string; verified: boolean }[] }[],
  setObjList: Function
) {
  let ProtoObj = [...ObjList];
  ProtoObj[index1] = {
    ...ProtoObj[index1],
    listToDo: ProtoObj[index1].listToDo.filter((item) => item.verified !== true),
  };
  setObjList(ProtoObj);
}

function CompletedTasks(
  ArrWithTasks: { name: string; verified: boolean }[]
) {
  return ArrWithTasks.filter((item) => item.verified === true).length;
}

function MakeItCompleted(
  setObjList: Function,
  ObjList: { listToDo: { name: string; verified: boolean }[] }[],
  index1: number,
  index2: number
) {
  let ProtoObj = [...ObjList];
  ProtoObj[index1].listToDo[index2].verified =
    !ProtoObj[index1].listToDo[index2].verified;
  setObjList(ProtoObj);
}

function MainPage() {
  const [TaskIndex, setTaskIndex] = useState(0);
  const [displayState, setDisplayState] = useState(0);
  const [stateMenu, setStateMenu] = useState(0);
  const [ObjIndex, setObjIndex] = useState(0);
  const [ObjList, setObjList] = useState([
    {
      task: "What I should do to be cool?",
      listToDo: [
        {
          name: "",
          verified: false,
        },
      ],
    },
  ]);

  function ReadTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let ProtoObj = [...ObjList];
    const target = event.target as typeof event.target & {
      task: { value: string };
    };
    let ReadedTask = target.task.value;
    if (ReadedTask !== "") {
      ProtoObj[TaskIndex].listToDo.push({
        name: ReadedTask,
        verified: false,
      });
      setObjList(ProtoObj);
      target.task.value = "";
    }
  }

  function CreateNewTarget(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let ProtoObj = [...ObjList];
    const target = event.target as typeof event.target & {
      TargetInput: { value: string };
    };
    let ReadedTarget = target.TargetInput.value;
    if (ReadedTarget !== "") {
      ProtoObj.push({
        task: ReadedTarget,
        listToDo: [
          {
            name: "",
            verified: false,
          },
        ],
      });
      setObjList(ProtoObj);
      setObjIndex(ProtoObj.length - 1);
      target.TargetInput.value = "";
    }
  }

  return (
    <>
      <div className="w-[100%] h-[100%] flex justify-center items-center py-[30px]">
        <div className="w-[1200px] h-[800px] rounded-[10px] bg-gray-100 flex flex-col py-[15px] items-center">
          <span className="text-[100px] font-thin text-red-200">todos</span>
          <div className="flex">
            <div
              className={`h-[100%] ${
                stateMenu === 1 ? "w-[300px]" : "w-[0px]"
              } bg-white overflow-hidden rounded transition-all duration-200 shadow-lg`}
            >
              <div className=" flex flex-col">
                <div className="w-[100%] flex items-center p-[10px] h-[50px] border-b border-solid">
                  <form onSubmit={CreateNewTarget} className="flex gap-[10px]">
                    <button
                      type="submit"
                      className="hover:bg-gray-200 transition cursor-pointer border border-solid rounded p-[5px]"
                    >
                      Add Target
                    </button>
                    <input
                      name="TargetInput"
                      type="text"
                      placeholder="Type Here"
                    ></input>
                  </form>
                </div>
                {ObjList.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => setObjIndex(i)}
                    className="hover:bg-gray-300 transition cursor-pointer p-[10px] w-[100%] flex justify-between border-b border-solid flex items-center"
                  >
                    <span>{item.task}</span>
                    <span>{item.listToDo.length} items</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative min-h-[500px] w-[700px] flex justify-center items-center">
              {ObjList.map((item, i) => (
                <div
                  key={i}
                  className={`${
                    ObjIndex === i ? "" : "hidden"
                  } absolute translate-y-[-${i * 10}px]`}
                >
                  <form
                    className="w-[100%] h-[40px] rounded flex mb-[5px] gap-[5px]"
                    onSubmit={ReadTask}
                  >
                    <button
                      onClick={() => setTaskIndex(i)}
                      type="submit"
                      className="cursor-pointer bg-white w-[100px] p-[10px] rounded flex justify-center shadow-lg"
                    >
                      Add Task
                    </button>
                    <input
                      name="task"
                      className="h-[100%] w-[100%] text-[20px] px-[5px] bg-white shadow-lg"
                      placeholder="Type here"
                    ></input>
                  </form>
                  <div className="bg-white h-[400px] w-[600px] rounded shadow-lg flex flex-col font-thin">
                    <div className="h-[70px] w-[100%] flex text-[25px] items-center px-[25px] border-b border-solid gap-[30px] text-gray-400 ">
                      <button
                        onClick={() => {
                          setStateMenu((prev) => (prev === 0 ? 1 : 0));
                        }}
                        className={`cursor-pointer text-[20px] ${
                          stateMenu === 1 ? "rotate-90" : ""
                        } transition-all duration-200`}
                      >
                        ᐯ
                      </button>
                      <span className="italic">{item.task}</span>
                    </div>
                    <div className="overflow-scroll">
                      {item.listToDo.map((element, index) => (
                        <div
                          key={index}
                          className={`${
                            displayState === 0
                              ? ""
                              : displayState === 1
                              ? element.verified === true
                                ? "hidden"
                                : ""
                              : displayState === 2
                              ? element.verified === false
                                ? "hidden"
                                : ""
                              : ""
                          } h-[70px] w-[100%] flex items-center text-[25px] px-[20px] border-b border-solid justify-between`}
                        >
                          <div className="flex gap-[20px]">
                            <div
                              onClick={() =>
                                MakeItCompleted(setObjList, ObjList, i, index)
                              }
                              className="cursor-pointer h-[35px] w-[35px] rounded-[50%] border border-solid transition border-gray-300 flex justify-center items-center select-none"
                            >
                              {element.verified === true ? "✔" : ""}
                            </div>
                            <span
                              className={`${
                                element.verified === true
                                  ? "line-through text-gray-400"
                                  : ""
                              }`}
                            >
                              {element.name}
                            </span>
                          </div>
                          <div
                            onClick={() =>
                              DeleteTask(ObjList, setObjList, i, index)
                            }
                            className="cursor-pointer bg-[url('src/assets/icons/trash.png')] bg-cover h-[32px] w-[32px]"
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white flex items-center h-[50px] text-gray-400 w-[100%] border-t border-solid px-[20px] justify-between">
                    <span>{CompletedTasks(item.listToDo)} left</span>
                    <div className="flex gap-[10px]">
                      <button
                        className={`cursor-pointer w-[50px] hover:text-gray-900 transition rounded p-[5px] ${
                          displayState === 0 ? "border border-solid" : ""
                        }`}
                        onClick={() => setDisplayState(0)}
                      >
                        All
                      </button>
                      <button
                        className={`cursor-pointer hover:text-gray-900 transition rounded p-[5px] ${
                          displayState === 1 ? "border border-solid" : ""
                        }`}
                        onClick={() => setDisplayState(1)}
                      >
                        Active
                      </button>
                      <button
                        className={`cursor-pointer hover:text-gray-900 transition rounded p-[5px] ${
                          displayState === 2 ? "border border-solid" : ""
                        }`}
                        onClick={() => setDisplayState(2)}
                      >
                        Completed
                      </button>
                    </div>
                    <button
                      onClick={() => ClearCompleted(i, ObjList, setObjList)}
                      className="cursor-pointer hover:text-gray-900 transition"
                    >
                      Clear Completed
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
