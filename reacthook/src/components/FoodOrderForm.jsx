import { useForm } from "react-hook-form";
import { useState } from "react";

function FoodOrderForm() {
  const [order, setOrder] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      quantity: 1,
    },
  });

  const paymentMethod = watch("payment");

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(data);

    setOrder(data);

    alert("Food Order Placed Successfully!");

    reset();
  };

  return (
    <div className="container">
      <h1>🍔 Food Order Form</h1>

      <form onSubmit={handleSubmit(onSubmit)}>

        {/* Customer Name */}

        <div className="form-group">
          <label>Customer Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            {...register("customerName", {
              required: "Customer name is required",
              minLength: {
                value: 3,
                message: "Minimum 3 characters",
              },
            })}
          />

          <p className="error">
            {errors.customerName?.message}
          </p>
        </div>

        {/* Email */}

        <div className="form-group">
          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email",
              },
            })}
          />

          <p className="error">
            {errors.email?.message}
          </p>
        </div>

        {/* Mobile */}

        <div className="form-group">
          <label>Mobile Number</label>

          <input
            type="tel"
            placeholder="9876543210"
            {...register("mobile", {
              required: "Mobile number is required",
              pattern: {
                value: /^[6-9]\d{9}$/,
                message: "Enter valid mobile number",
              },
            })}
          />

          <p className="error">
            {errors.mobile?.message}
          </p>
        </div>

        {/* Food */}

        <div className="form-group">
          <label>Select Food</label>

          <select
            {...register("food", {
              required: "Please select food",
            })}
          >
            <option value="">Choose Food</option>

            <option>Pizza</option>

            <option>Burger</option>

            <option>Biryani</option>

            <option>Fried Rice</option>

            <option>Noodles</option>

            <option>Pasta</option>
          </select>

          <p className="error">
            {errors.food?.message}
          </p>
        </div>

        {/* Quantity */}

        <div className="form-group">
          <label>Quantity</label>

          <input
            type="number"
            {...register("quantity", {
              required: "Quantity is required",
              min: {
                value: 1,
                message: "Minimum quantity is 1",
              },
            })}
          />

          <p className="error">
            {errors.quantity?.message}
          </p>
        </div>

             {/* Spice Level */}

        <div className="form-group">
          <label>Spice Level</label>

          <div className="radio-group">
            <label>
              <input
                type="radio"
                value="Mild"
                {...register("spiceLevel", {
                  required: "Select spice level",
                })}
              />
              Mild
            </label>

            <label>
              <input
                type="radio"
                value="Medium"
                {...register("spiceLevel", {
                  required: "Select spice level",
                })}
              />
              Medium
            </label>

            <label>
              <input
                type="radio"
                value="Hot"
                {...register("spiceLevel", {
                  required: "Select spice level",
                })}
              />
              Hot
            </label>
          </div>

          <p className="error">{errors.spiceLevel?.message}</p>
        </div>

        {/* Extra Toppings */}

        <div className="form-group">
          <label>Extra Toppings</label>

          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                value="Cheese"
                {...register("toppings")}
              />
              Cheese
            </label>

            <label>
              <input
                type="checkbox"
                value="Olives"
                {...register("toppings")}
              />
              Olives
            </label>

            <label>
              <input
                type="checkbox"
                value="Mushroom"
                {...register("toppings")}
              />
              Mushroom
            </label>

            <label>
              <input
                type="checkbox"
                value="Corn"
                {...register("toppings")}
              />
              Corn
            </label>
          </div>
        </div>

        {/* Delivery Date */}

        <div className="form-group">
          <label>Delivery Date</label>

          <input
            type="date"
            {...register("deliveryDate", {
              required: "Delivery date is required",
            })}
          />

          <p className="error">{errors.deliveryDate?.message}</p>
        </div>

        {/* Address */}

        <div className="form-group">
          <label>Delivery Address</label>

          <textarea
            placeholder="Enter your address"
            {...register("address", {
              required: "Address is required",
              minLength: {
                value: 10,
                message: "Minimum 10 characters",
              },
            })}
          />

          <p className="error">{errors.address?.message}</p>
        </div>

        {/* Payment Method */}

        <div className="form-group">
          <label>Payment Method</label>

          <select
            {...register("payment", {
              required: "Select payment method",
            })}
          >
            <option value="">Choose Payment</option>
            <option>Cash on Delivery</option>
            <option>UPI</option>
            <option>Credit Card</option>
            <option>Debit Card</option>
          </select>

          <p className="error">{errors.payment?.message}</p>
        </div>

        {/* Special Instructions */}

        <div className="form-group">
          <label>Special Instructions</label>

          <textarea
            placeholder="Optional"
            {...register("instructions")}
          />
        </div>

        {/* Terms */}

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              {...register("terms", {
                required: "You must accept Terms & Conditions",
              })}
            />

            I agree to the Terms & Conditions
          </label>

          <p className="error">{errors.terms?.message}</p>
        </div>

        {/* Payment Preview */}

        <div className="form-group">
          <strong>Selected Payment:</strong>{" "}
          {paymentMethod || "Not Selected"}
        </div>

        {/* Submit */}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Placing Order..." : "Place Order"}
        </button>

      </form>

      {/* Success Card */}

      {order && (
        <div className="success">
          <h2>🎉 Order Placed Successfully!</h2>

          <p><strong>Name:</strong> {order.customerName}</p>

          <p><strong>Email:</strong> {order.email}</p>

          <p><strong>Mobile:</strong> {order.mobile}</p>

          <p><strong>Food:</strong> {order.food}</p>

          <p><strong>Quantity:</strong> {order.quantity}</p>

          <p><strong>Spice Level:</strong> {order.spiceLevel}</p>

          <p>
            <strong>Toppings:</strong>{" "}
            {order.toppings?.length
              ? order.toppings.join(", ")
              : "None"}
          </p>

          <p><strong>Delivery Date:</strong> {order.deliveryDate}</p>

          <p><strong>Payment:</strong> {order.payment}</p>

          <p><strong>Address:</strong> {order.address}</p>

          {order.instructions && (
            <p>
              <strong>Instructions:</strong>{" "}
              {order.instructions}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default FoodOrderForm;   