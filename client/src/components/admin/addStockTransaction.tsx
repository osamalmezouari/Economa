import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const transactionTypes = ["purchase", "sale", "return", "adjustment"];

export default function StockTransactionDialog({ open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    transactionType: "purchase",
    quantity: "",
    unitCost: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Stock Transaction</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="dense">
          <InputLabel>Transaction Type</InputLabel>
          <Select
            name="transactionType"
            value={formData.transactionType}
            onChange={handleChange}
          >
            {transactionTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          margin="dense"
          label="Quantity"
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleChange}
        />

        {formData.transactionType === "purchase" && (
          <TextField
            fullWidth
            margin="dense"
            label="Unit Cost"
            name="unitCost"
            type="number"
            value={formData.unitCost}
            onChange={handleChange}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
