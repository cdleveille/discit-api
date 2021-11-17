import cpx from "cpx";
cpx.copy("public/**/!(ts|js)/*", "public.min");
cpx.copy("public/js/**/*.js", "public.min/js");