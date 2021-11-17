import { copy } from "cpx";
copy("public/**/!(ts|js)/*", "public.min");
copy("public/js/**/*.js", "public.min/js");