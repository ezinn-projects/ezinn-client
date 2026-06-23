import Image from "next/image";

const navigation = {
  connect: [
    {
      name: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61575350724412&locale=vi_VN",
    },
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@jozomusicbox?is_from_webapp=1&sender_device=pc",
    },
  ],
  explore: [
    { name: "Trang Chủ", href: "/" },
    { name: "Đặt Phòng", href: "/booking-search" },
    { name: "Tuyển Dụng", href: "/recruitment" },
    { name: "Đăng Ký", href: "/register" },
  ],
};

const TwoColumnFooter = () => {
  return (
    <footer
      aria-labelledby="footer-heading"
      className="font-inter w-full border-t border-red-100/80 bg-white pt-2 text-primary"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-3 sm:px-5 md:px-8 lg:px-10">
        <div className="flex flex-col justify-between lg:flex-row">
          <div className="space-y-8">
            <div className="space-y-2 text-sm text-primary/75">
              <div className="flex items-center space-x-1">
                <span>Được phát triển với ❤️ bởi </span>
                <Image
                  priority={true}
                  unoptimized={true}
                  width={100}
                  height={40}
                  src="/images/jozo-logo.png"
                  alt="logo"
                  className="h-7 w-auto"
                  style={{ width: "auto" }}
                />
              </div>
              <p>
                Địa chỉ:{" "}
                <a
                  href="https://maps.app.goo.gl/EY3WPsWzYbkaFQkZA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary underline-offset-2 hover:underline"
                >
                  30 Phan Trung
                </a>
              </p>
            </div>
          </div>
          {/* Navigations */}
        </div>
        <div className="border-t border-primary/10 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-primary/65">
            &copy; 2026 JOZO. Đã đăng ký bản quyền. Mọi quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default TwoColumnFooter;
