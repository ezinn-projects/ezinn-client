/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { DateSelect } from "@/components/ui/date-select";
import Input from "@/components/ui/input";
import { RegisterFormData, registerSchema } from "@/schemas/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
// import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export default function RegisterForm() {
  const defaultBirthDate = new Date();
  defaultBirthDate.setFullYear(defaultBirthDate.getFullYear() - 18);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      date_of_birth: defaultBirthDate,
    },
  });

  const router = useRouter();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          role: "user",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("Email đã tồn tại trong hệ thống");
        }
        throw new Error(result.message || "Đăng ký thất bại");
      }

      // Đăng ký thành công
      toast({
        title: "Đăng ký thành công!",
        description: "Bạn đã đăng ký thành công!",
      });
      router.push("/login");
    } catch (error: any) {
      toast({
        title: "Đăng ký thất bại!",
        description: error.message,
      });
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-black rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-lightpink">
        Đăng ký tài khoản
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Họ và tên"
          required
          {...register("full_name")}
          error={errors.full_name?.message}
        />

        <Input
          label="Số điện thoại"
          type="number"
          required
          {...register("phone_number")}
          error={errors.phone_number?.message}
          maxLength={10}
        />

        <Input
          label="Email"
          type="email"
          {...register("email")}
          error={errors.email?.message}
        />

        <Input
          label="Passcode"
          type="password"
          required
          {...register("password")}
          error={errors.password?.message}
          showPasswordToggle
          maxLength={6}
          onKeyDown={(e) => {
            // Cho phép các phím đặc biệt
            if (
              e.key === "Backspace" ||
              e.key === "Delete" ||
              e.key === "ArrowLeft" ||
              e.key === "ArrowRight" ||
              e.key === "Tab" ||
              /[0-9]/.test(e.key)
            ) {
              return;
            }
            e.preventDefault();
          }}
          helpText="Passcode chỉ bao gồm 6 chữ số"
        />

        <Input
          label="Xác nhận Passcode"
          type="password"
          {...register("confirm_password")}
          error={errors.confirm_password?.message}
          showPasswordToggle
          maxLength={6}
          onKeyDown={(e) => {
            // Cho phép các phím đặc biệt
            if (
              e.key === "Backspace" ||
              e.key === "Delete" ||
              e.key === "ArrowLeft" ||
              e.key === "ArrowRight" ||
              e.key === "Tab" ||
              /[0-9]/.test(e.key)
            ) {
              return;
            }
            e.preventDefault();
          }}
          helpText="Passcode chỉ bao gồm 6 chữ số"
        />

        <div className="mb-4">
          <Controller
            control={control}
            name="date_of_birth"
            render={({ field }) => (
              <DateSelect
                value={field.value}
                onChange={field.onChange}
                error={errors.date_of_birth?.message}
              />
            )}
          />
        </div>

        <Button
          type="submit"
          className="w-full animate-buttonheartbeat bg-lightpink text-white"
          onClick={handleSubmit(onSubmit)}
        >
          Đăng ký
        </Button>
      </form>
    </div>
  );
}
