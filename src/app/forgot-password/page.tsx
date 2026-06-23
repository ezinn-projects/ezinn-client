"use client";

import { Button } from "@/components/ui/button";
import { FormCard } from "@/components/ui/form-card";
import Input from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { forgotPassword } from "@/lib/api-utils";
import {
  ForgotPasswordFormData,
  forgotPasswordSchema,
} from "@/schemas/forgot-password.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

const mapForgotPasswordError = (message?: string) => {
  if (!message) return "Không thể gửi email đặt lại mật khẩu.";
  if (message === "Email not found")
    return "Không tìm thấy email trong hệ thống.";
  return message;
};

export default function ForgotPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: false,
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsSubmitting(true);

    try {
      const result = await forgotPassword(data.email);

      if (!result.success) {
        throw new Error(mapForgotPasswordError(result.message));
      }

      setSubmittedEmail(data.email);
      toast({
        title: "Đã gửi email",
        description: "Vui lòng kiểm tra hộp thư để đặt lại mật khẩu.",
      });
    } catch (error) {
      toast({
        title: "Gửi email thất bại",
        description:
          error instanceof Error
            ? error.message
            : "Không thể gửi email đặt lại mật khẩu.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedEmail) {
    return (
      <div className="max-w-3xl mx-auto px-4">
        <FormCard className="max-w-md w-full mx-auto">
          <h2 className="text-2xl font-bold mb-2 text-center text-primary">
            Kiểm tra email của bạn
          </h2>
          <p className="text-sm text-center text-primary/70 mb-4">
            Jozo đã gửi liên kết đặt lại mật khẩu đến{" "}
            <span className="font-semibold text-primary">{submittedEmail}</span>
            .
          </p>
          <p className="text-sm text-center text-primary/70 mb-6">
            Vui lòng kiểm tra hộp thư đến. Nếu không thấy email, hãy kiểm tra
            trong hộp thư rác hoặc spam.
          </p>
          <Button asChild className="w-full">
            <Link href="/login">Quay lại đăng nhập</Link>
          </Button>
        </FormCard>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      <FormCard className="max-w-md w-full mx-auto">
        <h2 className="text-2xl font-bold mb-2 text-center text-primary">
          Quên mật khẩu
        </h2>
        <p className="text-sm text-center text-primary/70 mb-6">
          Nhập email đã đăng ký để nhận liên kết đặt lại mật khẩu.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email"
            type="email"
            required
            placeholder="user@email.com"
            {...register("email")}
            error={errors.email?.message}
          />

          <Button
            type="submit"
            className="w-full animate-buttonheartbeat bg-lightpink text-white font-semibold py-3 rounded-lg hover:bg-pink-600 transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang gửi..." : "Gửi liên kết đặt lại mật khẩu"}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-primary/70">
          Nhớ mật khẩu?{" "}
          <Link
            href="/login"
            className="font-semibold text-pink-600 hover:underline"
          >
            Đăng nhập
          </Link>
        </p>
      </FormCard>
    </div>
  );
}
