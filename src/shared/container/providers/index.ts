import { container } from "tsyringe";

// Date provider
import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayJsDateProvider } from "./DateProvider/implementations/DayJsDateProvider";

// Mail provider
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";

// Date provider
container.registerSingleton<IDateProvider>(
  "DayJsDateProvider",
  DayJsDateProvider,
);

// Mail provider
container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider(),
);
