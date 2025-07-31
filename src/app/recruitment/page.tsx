"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

import { DateSelect } from "@/components/ui/date-select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import Input from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  RecruitmentFormData,
  recruitmentSchema,
} from "@/schemas/recruitment.schema";

export default function RecruitmentPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RecruitmentFormData>({
    resolver: zodResolver(recruitmentSchema),
    defaultValues: {
      fullName: "",
      birthDate: "01/01/2004", // Mặc định 1/1/2004
      gender: "",
      phone: "",
      email: "",
      socialMedia: "",
      currentStatus: "",
      otherStatus: "",
      position: [],
      workShifts: [],
    },
  });

  const currentStatus = watch("currentStatus");

  const onSubmit = async (data: RecruitmentFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/recruitment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          submittedAt: new Date().toISOString(),
          status: "pending",
        }),
      });

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi gửi đơn ứng tuyển");
      }

      toast({
        title: "Gửi đơn thành công! 🎉",
        description:
          "Cảm ơn bạn đã ứng tuyển! Chúng mình sẽ liên hệ sớm nhất có thể.",
      });

      // Reset form
      setValue("fullName", "");
      setValue("birthDate", "01/01/2004");
      setValue("gender", "");
      setValue("phone", "");
      setValue("email", "");
      setValue("socialMedia", "");
      setValue("currentStatus", "");
      setValue("otherStatus", "");
      setValue("position", []);
      setValue("workShifts", []);
    } catch {
      toast({
        title: "Gửi đơn thất bại! 😔",
        description: "Có lỗi xảy ra. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-pink-600 mb-4">
            TÌM ĐỒNG ĐỘI PART-TIME
          </h1>
          <h2 className="text-xl md:text-2xl text-pink-600 font-semibold">
            Jozo - Nơi kết nối những con người trẻ trung, năng động
          </h2>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <p className="text-blue-800 font-medium">📅 Đăng tuyển: 1/8/2024</p>
          </div>
          <p className="text-gray-600 mt-4 text-lg">
            Cảm ơn bạn đã tìm đến Jozo! 🥰 Chúng mình đang tìm những người bạn
            trẻ, nhiệt huyết để cùng xây dựng môi trường vui vẻ này. Bạn có muốn
            tham gia cùng chúng mình không? 🎵
          </p>
        </div>

        {/* Job Description */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            💼 YÊU CẦU CÔNG VIỆC CHI TIẾT
          </h3>

          <div className="space-y-8">
            {/* Yêu cầu chung */}
            <div>
              <h4 className="text-lg font-semibold text-pink-600 mb-3">
                📋 YÊU CẦU CHUNG
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <span className="text-pink-500 mt-1">🎯</span>
                  <p className="text-gray-700">
                    <strong>Độ tuổi:</strong> 18-25 tuổi
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-pink-500 mt-1">📌</span>
                  <p className="text-gray-700">
                    <strong>Yêu cầu:</strong>
                  </p>
                </div>
                <div className="ml-6 space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <p className="text-gray-700">
                      Có tinh thần trách nhiệm, trung thực, chịu khó
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <p className="text-gray-700">
                      Thái độ nhiệt tình, vui vẻ, giao tiếp tốt
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <p className="text-gray-700">
                      Nhanh nhẹn, biết phối hợp nhóm
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <p className="text-gray-700">Chủ động trong công việc</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <p className="text-gray-700">
                      Có thể làm theo ca linh hoạt là một lợi thế
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <p className="text-gray-700">
                      Không yêu cầu kinh nghiệm – sẽ được đào tạo từ đầu
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Nhân viên lễ tân */}
            <div>
              <h4 className="text-lg font-semibold text-pink-600 mb-3">
                💰 NHÂN VIÊN LỄ TÂN
              </h4>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-gray-800 mb-3">
                    📋 CÔNG VIỆC CHÍNH:
                  </h5>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">👋</span>
                      <p className="text-gray-700">
                        Tiếp đón khách, tư vấn chọn phòng và báo giá phù hợp
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">🥤</span>
                      <p className="text-gray-700">
                        Phục vụ nước và snack theo yêu cầu khách
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">📦</span>
                      <p className="text-gray-700">
                        Đảm bảo quầy nước/snack luôn đầy đủ, bổ sung kịp thời
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">📊</span>
                      <p className="text-gray-700">
                        Kiểm kê tồn kho nước/snack mỗi ca, báo lại cho quản lý
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">📞</span>
                      <p className="text-gray-700">
                        Trực tin nhắn và điện thoại hotline để nhận đặt phòng
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">💳</span>
                      <p className="text-gray-700">
                        Thanh toán cho khách sau khi sử dụng dịch vụ
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">🤝</span>
                      <p className="text-gray-700">
                        Hỗ trợ đồng đội khi cần, đặc biệt vào thời điểm đông
                        khách
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Nhân viên phục vụ */}
            <div>
              <h4 className="text-lg font-semibold text-pink-600 mb-3">
                🎵 NHÂN VIÊN PHỤC VỤ
              </h4>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-gray-800 mb-3">
                    📋 CÔNG VIỆC CHÍNH:
                  </h5>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">🎯</span>
                      <p className="text-gray-700">
                        Setup phòng trước khi khách vào
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">👋</span>
                      <p className="text-gray-700">
                        Dẫn khách vào phòng và hướng dẫn sử dụng thiết bị cơ bản
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">🧹</span>
                      <p className="text-gray-700">
                        Dọn phòng sau khi khách sử dụng xong
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">✨</span>
                      <p className="text-gray-700">
                        Đảm bảo vệ sinh khu vực chung (hành lang, toilet,…)
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">🔧</span>
                      <p className="text-gray-700">
                        Hỗ trợ xử lý các vấn đề kỹ thuật trong quá trình khách
                        sử dụng (sẽ được training)
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">🤝</span>
                      <p className="text-gray-700">
                        Hỗ trợ đồng đội khi cần, đặc biệt vào thời điểm đông
                        khách
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Nhân viên giữ xe */}
            <div>
              <h4 className="text-lg font-semibold text-pink-600 mb-3">
                🚗 NHÂN VIÊN GIỮ XE
              </h4>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-gray-800 mb-3">
                    📋 CÔNG VIỆC CHÍNH:
                  </h5>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">🛵</span>
                      <p className="text-gray-700">
                        Dắt xe cho khách khi đến và ra về
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">📦</span>
                      <p className="text-gray-700">
                        Sắp xếp xe gọn gàng, canh giữ xe, đảm bảo an toàn khu
                        vực phía trước quán
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">✨</span>
                      <p className="text-gray-700">
                        Đảm bảo vệ sinh, gọn gàng khu vực giữ xe
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-pink-500 mt-1">🤝</span>
                      <p className="text-gray-700">
                        Phối hợp với lễ tân để cập nhật tình trạng phòng trống
                        và phản hồi kịp thời tới khách hàng khi tới quán
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quyền lợi */}
            <div>
              <h4 className="text-lg font-semibold text-pink-600 mb-3">
                🎁 THU NHẬP:
              </h4>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-1">💰</span>
                    <p className="text-gray-700">
                      <strong>Lương cơ bản:</strong> 22,000 VNĐ/giờ
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-1">🎯</span>
                    <p className="text-gray-700">
                      <strong>Thưởng:</strong> Theo doanh thu và hiệu suất công
                      việc
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            ✨ HÃY ĐỒNG HÀNH CÙNG JOZO
          </h3>
          <p className="text-gray-600 mb-6 text-center">
            Chỉ mất 2 phút thôi! Hãy chia sẻ một chút thông tin về bạn nhé.
            Chúng mình rất muốn biết thêm về bạn! 😊
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Họ tên */}
            <div>
              <Label
                htmlFor="fullName"
                className="text-base font-medium text-gray-900"
              >
                1. Tên bạn là gì? *
              </Label>
              <Input
                id="fullName"
                type="text"
                {...register("fullName")}
                placeholder="Nhập họ tên đầy đủ của bạn"
                className="mt-2"
                required
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Ngày sinh */}
            <div>
              <Label className="text-base font-medium text-gray-900 mb-2 block">
                2. Ngày sinh của bạn? *
              </Label>
              <Controller
                name="birthDate"
                control={control}
                render={({ field }) => {
                  // Convert string to Date for DateSelect component
                  const dateValue = field.value
                    ? new Date(field.value.split("/").reverse().join("-"))
                    : new Date(2004, 0, 1);

                  return (
                    <DateSelect
                      value={dateValue}
                      onChange={(date) => {
                        // Convert Date back to dd/mm/yyyy format
                        const day = date.getDate().toString().padStart(2, "0");
                        const month = (date.getMonth() + 1)
                          .toString()
                          .padStart(2, "0");
                        const year = date.getFullYear();
                        field.onChange(`${day}/${month}/${year}`);
                      }}
                      label=""
                    />
                  );
                }}
              />
              {errors.birthDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.birthDate.message}
                </p>
              )}
            </div>

            {/* Giới tính */}
            <div>
              <Label className="text-base font-medium text-gray-900">
                3. Giới tính của bạn? *
              </Label>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="mt-2 space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male" className="text-gray-900">
                        Nam
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female" className="text-gray-900">
                        Nữ
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other" className="text-gray-900">
                        Khác
                      </Label>
                    </div>
                  </RadioGroup>
                )}
              />
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.gender.message}
                </p>
              )}
            </div>

            {/* Số điện thoại */}
            <div>
              <Label
                htmlFor="phone"
                className="text-base font-medium text-gray-900"
              >
                4. Số điện thoại của bạn? *
              </Label>
              <Input
                id="phone"
                type="tel"
                {...register("phone")}
                placeholder="Nhập số điện thoại"
                className="mt-2"
                required
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label
                htmlFor="email"
                className="text-base font-medium text-gray-900"
              >
                5. Email của bạn? (Tùy chọn)
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="Nhập email của bạn"
                className="mt-2"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Facebook/Zalo */}
            <div>
              <Label
                htmlFor="socialMedia"
                className="text-base font-medium text-gray-900"
              >
                6. Facebook hoặc Zalo của bạn? * (để chúng mình liên hệ dễ dàng
                hơn)
              </Label>
              <Input
                id="socialMedia"
                type="text"
                {...register("socialMedia")}
                placeholder="Nhập link Facebook hoặc số Zalo"
                className="mt-2"
                required
              />
              {errors.socialMedia && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.socialMedia.message}
                </p>
              )}
            </div>

            {/* Vị trí ứng tuyển */}
            <div>
              <Label className="text-base font-medium text-gray-900">
                7. Bạn muốn ứng tuyển vị trí nào? * (có thể chọn nhiều vị trí)
              </Label>
              <Controller
                name="position"
                control={control}
                render={({ field }) => (
                  <div className="mt-2 space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="cashier"
                        checked={field.value?.includes("cashier")}
                        onCheckedChange={(checked) => {
                          const currentPositions = field.value || [];
                          if (checked) {
                            field.onChange([...currentPositions, "cashier"]);
                          } else {
                            field.onChange(
                              currentPositions.filter(
                                (pos) => pos !== "cashier"
                              )
                            );
                          }
                        }}
                      />
                      <Label htmlFor="cashier" className="text-gray-900">
                        💰 Nhân viên lễ tân
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="server"
                        checked={field.value?.includes("server")}
                        onCheckedChange={(checked) => {
                          const currentPositions = field.value || [];
                          if (checked) {
                            field.onChange([...currentPositions, "server"]);
                          } else {
                            field.onChange(
                              currentPositions.filter((pos) => pos !== "server")
                            );
                          }
                        }}
                      />
                      <Label htmlFor="server" className="text-gray-900">
                        🎵 Nhân viên phục vụ
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="parking"
                        checked={field.value?.includes("parking")}
                        onCheckedChange={(checked) => {
                          const currentPositions = field.value || [];
                          if (checked) {
                            field.onChange([...currentPositions, "parking"]);
                          } else {
                            field.onChange(
                              currentPositions.filter(
                                (pos) => pos !== "parking"
                              )
                            );
                          }
                        }}
                      />
                      <Label htmlFor="parking" className="text-gray-900">
                        🚗 Nhân viên giữ xe
                      </Label>
                    </div>
                  </div>
                )}
              />
              {errors.position && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.position.message}
                </p>
              )}
            </div>

            {/* Ca làm việc */}
            <div>
              <Label className="text-base font-medium text-gray-900">
                8. Bạn có thể làm việc ca nào? * (có thể chọn cả 2 ca)
              </Label>
              <Controller
                name="workShifts"
                control={control}
                render={({ field }) => (
                  <div className="mt-2 space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="morning"
                        checked={field.value?.includes("morning")}
                        onCheckedChange={(checked) => {
                          const currentShifts = field.value || [];
                          if (checked) {
                            field.onChange([...currentShifts, "morning"]);
                          } else {
                            field.onChange(
                              currentShifts.filter(
                                (shift) => shift !== "morning"
                              )
                            );
                          }
                        }}
                      />
                      <Label htmlFor="morning" className="text-gray-900">
                        🌅 Ca sáng (12:00 - 17:00)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="evening"
                        checked={field.value?.includes("evening")}
                        onCheckedChange={(checked) => {
                          const currentShifts = field.value || [];
                          if (checked) {
                            field.onChange([...currentShifts, "evening"]);
                          } else {
                            field.onChange(
                              currentShifts.filter(
                                (shift) => shift !== "evening"
                              )
                            );
                          }
                        }}
                      />
                      <Label htmlFor="evening" className="text-gray-900">
                        🌙 Ca tối (17:00 - 22:00)
                      </Label>
                    </div>
                  </div>
                )}
              />
              {errors.workShifts && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.workShifts.message}
                </p>
              )}
            </div>

            {/* Hiện đang là */}
            <div>
              <Label className="text-base font-medium text-gray-900">
                9. Hiện tại bạn đang làm gì? *
              </Label>
              <Controller
                name="currentStatus"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="mt-2 space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="student" id="student" />
                      <Label htmlFor="student" className="text-gray-900">
                        Sinh viên
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="working" id="working" />
                      <Label htmlFor="working" className="text-gray-900">
                        Đi làm
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other" className="text-gray-900">
                        Khác (bạn có thể chia sẻ thêm):
                      </Label>
                    </div>
                  </RadioGroup>
                )}
              />
              {errors.currentStatus && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.currentStatus.message}
                </p>
              )}

              {currentStatus === "other" && (
                <Controller
                  name="otherStatus"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      value={field.value || ""}
                      onChange={field.onChange}
                      placeholder="Hãy chia sẻ thêm về bạn nhé"
                      className="mt-2 ml-6"
                    />
                  )}
                />
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full animate-buttonheartbeat bg-lightpink text-white font-semibold py-3 px-6 rounded-lg text-lg"
              >
                {isSubmitting ? "Đang gửi..." : "🤝 Gửi thông tin"}
              </Button>
            </div>
          </form>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-8 text-gray-600">
          <p className="text-sm">
            📞 Liên hệ:{" "}
            <a
              href="tel:0336051204"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              0336051204
            </a>
          </p>
          <p className="text-sm mt-2">
            📧 Email:{" "}
            <a
              href="mailto:jozostudiollc@gmail.com"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              jozostudiollc@gmail.com
            </a>
          </p>
          <p className="text-sm mt-2">
            🏢 Địa chỉ:{" "}
            <a
              href="https://www.google.com/maps/place/Jozo+Music+Box/@10.9615421,106.8471298,1234m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3174dd6fa7fe3c73:0xac4d7af01bc4f800!8m2!3d10.9615421!4d106.8520007!16s%2Fg%2F11m64vjf12?entry=ttu&g_ep=EgoyMDI1MDcyOC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              78 Phan Trung, Tam Hiệp, Đồng Nai
            </a>
          </p>
          <p className="text-sm mt-4 text-pink-600 font-medium">
            💝 Cảm ơn bạn đã quan tâm đến Jozo! Chúng mình rất mong được gặp
            bạn! 💝
          </p>
          <p className="text-xs mt-2 text-gray-500 text-center">
            🔒 Cam kết bảo mật: Thông tin của bạn sẽ được bảo mật tuyệt đối và
            chỉ sử dụng cho mục đích tuyển dụng
          </p>
        </div>
      </div>
    </div>
  );
}
