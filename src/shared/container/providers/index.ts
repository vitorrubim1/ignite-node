import { container } from "tsyringe";

// Date provider
import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayJsDateProvider } from "./DateProvider/implementations/DayJsDateProvider";

// Mail provider
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";
import { LocalStorageProvider } from "./StorageProvider/implementations/LocalStorageProvider";
import { S3StorageProvider } from "./StorageProvider/implementations/S3StorageProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";

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

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

// Storage (photos)
container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  diskStorage[process.env.disk],
);
