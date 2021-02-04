import React, { useState } from "react";
import {
  makeStyles,
  createStyles,
  Theme,
  Typography,
  TextField,
  Chip,
  Input,
  Select,
  MenuItem,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { cities } from "./cities";
import { activites } from "./activities";

const CreateProfile: React.FC = () => {
  const [values, setValues] = useState({
    firstName: "",
    dateOfBirth: "2000-01-01",
    selectedCity: "",
    selectedActivities: [] as string[],
  });

  console.log(values);
  return (
    <>
      <Typography gutterBottom>First Name</Typography>
      <TextField
        id="firstName"
        name="First Name"
        inputProps={{ "data-testid": `create-profile-first-name` }}
        variant={"outlined"}
        size="small"
        onChange={(e) => setValues({ ...values, firstName: e.target.value })}
        value={values.firstName}
      />
      <TextField
        id="date"
        label="Date of Birth"
        type="date"
        variant={"outlined"}
        value={values.dateOfBirth}
        onChange={(e) => setValues({ ...values, dateOfBirth: e.target.value })}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <Autocomplete
        options={cities}
        value={values.selectedCity}
        autoHighlight
        data-testid="cities-drop-down-value-selection"
        onChange={(_, e) => setValues({ ...values, selectedCity: e || "" })}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            id="country-name"
            inputProps={{
              ...params.inputProps,
              "data-testid": "country-name",
            }}
            data-testid="country-dropdown-text-field"
            name="City"
            label="City"
          />
        )}
      />

      {values.selectedActivities.length > 0 &&
        values.selectedActivities.map((x) => (
          <Chip
            label={x}
            onDelete={(x) =>
              setValues({
                ...values,
                selectedActivities: values.selectedActivities.filter(
                  (activity) => activity !== x
                ),
              })
            }
          />
        ))}
      <Select
        labelId="demo-mutiple-name-label"
        id="demo-mutiple-name"
        multiple
        value={values.selectedActivities}
        onChange={(e) =>
          setValues({
            ...values,
            selectedActivities: e.target.value as string[],
          })
        }
        input={<Input />}
      >
        {activites.map((activity) => (
          <MenuItem key={activity} value={activity}>
            {activity}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default CreateProfile;
