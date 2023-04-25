import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import style from "./index.module.css";
import TaskDetailModal from "../TaskDetail/index";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables(props) {
  const [rows, setRow] = useState([]);
  const [updaterows, setupdaterows] = useState([]);
  const [show, setshow] = useState(false);
  const [taskDetails, setTaskdetails] = useState({
    id: "",
    task: "",
    description: "",
    status: false,
  });

  const [filters, setfilter] = useState([
    {
      name: "All",
      checked: true,
    },
    {
      name: "Completed",
      checked: false,
      status: true,
    },
    {
      name: "Not Completed",
      checked: false,
      status: true,
    },
  ]);

  useEffect(() => {
    setRow(props.Task);
    setupdaterows(props.Task);  
  }, [props.Task]);

  const handlegettask = (task, id) => {
    setTaskdetails((prevState) => ({
      ...prevState,
      id: task.id,
      task: task.task,
      description: task.description,
      status: task.status,
    }));
    setshow(true);
  };

  const handleSave = (data) => {
    setshow(false);
    let updateArray = rows;
    updateArray.map((task) => {
      if (task.id === data.id) {
        return (task.status = data.status);
      }
    });
    setRow(updateArray);
  };

  const handledelete = (id) => {
    setshow(false);
    let updateArray = rows;
    updateArray.map((task, i) => {
      if (task.id === id) {
        return updateArray.splice(i, 1);
      }
    });
    setRow(updateArray);
  };

  const handleChange = (e, name) => {
    let filter = filters;
    for (let i = 0; i < filter.length; i++) {
      if (filter[i].name === name) {
        filter[i].checked = true;
      } else {
        filter[i].checked = false;
      }
    }

    setfilter(filter);

    if (name === "Not Completed") {
      let updateRows = rows.filter((el) => {
        return el.status === false;
      });
      setupdaterows(updateRows);
    } else if (name === "Completed") {
      let updateRows = rows.filter((el) => {
        return el.status === true;
      });
      setupdaterows(updateRows);
    } else {
      setupdaterows(rows);
    }
  };

  return (
    <div className={style.taskTable}>
      {!show ? (
        <div>
        <div className='filter'>
            {filters.map((filter, i) => {
            return (
                <div>
                <FormControlLabel
                    label={filter.name}
                    control={
                    <Checkbox
                        label={filter.name}
                        checked={filter.checked}
                        onChange={(e) => handleChange(e, filter.name)}
                    />
                    }
                />
                </div>
            );
            })}
        </div>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Task</StyledTableCell>
                  <StyledTableCell align="center">Description</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {updaterows.map((row, i) => (
                  <StyledTableRow
                   sx={{ cursor: 'pointer' }}
                    key={`task-${i}`}
                    onClick={() => handlegettask(row, `task-${i}`)}
                  >
                    <StyledTableCell sx={{ pointer: "cursor" }} align="center">
                      {row.task}
                    </StyledTableCell>
                    <StyledTableCell sx={{ pointer: "cursor" }} align="center">
                      {row.description}
                    </StyledTableCell>
                    <StyledTableCell sx={{ pointer: "cursor" }} align="center">
                      {" "}
                      <Checkbox {...label} disabled checked={row.status} />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <TaskDetailModal
          task={taskDetails}
          handleSave={handleSave}
          handledelete={handledelete}
        />
      )}
    </div>
  );
}

CustomizedTables.prototype = {
  Task: PropTypes.oneOfType([PropTypes.object]),
};
