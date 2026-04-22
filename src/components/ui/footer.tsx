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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between lg:flex-row">
          <div className="space-y-8">
            <div className="flex items-center space-x-1 text-sm text-primary/75">
              <span>Được phát triển với ❤️ bởi </span>
              <Image
                priority={true}
                unoptimized={true}
                width={100}
                height={40}
                src="/images/jozo-logo.png"
                alt="logo"
                className="h-7 w-auto"
              />
            </div>
          </div>
          {/* Navigations */}
          <div className="mt-16 grid grid-cols-2 gap-14 md:grid-cols-2 lg:mt-0 xl:col-span-2">
            <div className="md:mt-0">
              <h3 className="text-sm font-semibold leading-6 text-primary">
                Kết Nối
              </h3>
              <div className="mt-6 space-y-4">
                {navigation.connect.map((item) => (
                  <div key={item.name}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm leading-6 text-primary/80 hover:text-primary"
                    >
                      {item.name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div>
                <h3 className="text-sm font-semibold leading-6 text-primary">
                  Khám Phá
                </h3>
                <div className="mt-6 space-y-4">
                  {navigation.explore.map((item) => (
                    <div key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-primary/80 hover:text-primary"
                      >
                        {item.name}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-primary/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-primary/65">
            &copy; 2026 JOZO. Đã đăng ký bản quyền. Mọi quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default TwoColumnFooter;
