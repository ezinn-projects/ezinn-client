/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import Link from "next/link";

const loginSchema = z.object({
  phone_number: z
    .string()
    .regex(
      /^(0)[0-9]{9}$/,
      "Số điện thoại không đúng định dạng Việt Nam (VD: 0912345678)"
    ),
  password: z
    .string()
    .length(6, "Passcode phải đủ 6 số")
    .regex(/^\d+$/, "Passcode chỉ được chứa số"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Đăng nhập thất bại");
      }

      toast({
        title: "Đăng nhập thành công!",
        description: "Chào mừng bạn đã quay trở lại!",
      });
      router.push("/");
    } catch (error: any) {
      toast({
        title: "Đăng nhập thất bại!",
        description: error.message,
      });
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-black rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-lightpink">
        Đăng nhập
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Số điện thoại"
          {...register("phone_number")}
          error={errors.phone_number?.message}
          maxLength={10}
          type="number"
        />

        <Input
          label="Passcode"
          type="password"
          {...register("password")}
          error={errors.password?.message}
          showPasswordToggle
          maxLength={6}
          helpText="Passcode chỉ bao gồm 6 chữ số"
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
        />

        <div className="flex justify-end mb-4">
          <Link
            href="/forgot-password"
            className="text-sm text-lightpink hover:underline"
          >
            Quên mật khẩu?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full animate-buttonheartbeat bg-lightpink text-white"
        >
          Đăng nhập
        </Button>
      </form>

      <div className="mt-4 text-center text-lightpink">
        Chưa có tài khoản?{" "}
        <Link href="/register" className="text-white hover:underline">
          Đăng ký ngay
        </Link>
      </div>
    </div>
  );
}
