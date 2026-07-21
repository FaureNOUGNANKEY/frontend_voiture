export default function AdminFooter() {
  return (
    <footer
      className="ml-64 w-[calc(100%-16rem)] py-8 px-6 flex flex-col md:flex-row
      justify-between items-center bg-slate-100 border-t border-slate-200"
    >
      <div className="mb-4 md:mb-0">
        <img src="/appLogo.png" alt="logo"  width={100}/>
        <p className="text-sm text-slate-500 mt-2">
          © 2024 Easy Car Rental. All rights reserved.
        </p>
      </div>
      <div className="flex gap-8">
        {["Privacy Policy", "Terms of Service", "FAQ", "Support"].map((item) => (
          <a
            key={item}
            href="#"
            className="text-sm text-slate-500 hover:text-primary hover:underline"
          >
            {item}
          </a>
        ))}
      </div>
    </footer>
  );
}