import { EventTypes, IConnectRequestPayload, IRuntimeConnectResponse, ISitePermissions, XBULL_CONNECT } from '../interfaces';

class Sdk {
  isConnected = false;

  constructor() { }

  sendEventToContentScript<T, R>(eventName: EventTypes, payload: T): Promise<CustomEvent<R>> {
    return new Promise<CustomEvent<R>>((resolve) => {
      // We use this id to create a unique event listener and avoid mixing messages
      const eventId = (new Date().getTime() + Math.random()).toString(16);

      const eventListener = (event: any) => {
        resolve(event);
        window.removeEventListener(eventId, eventListener, false);
      };

      window.addEventListener(eventId, eventListener, false);

      const dispatchEventParams: CustomEventInit<T> = {
        detail: {
          ...payload,
          eventId,
        },
      };

      window.dispatchEvent(new CustomEvent(eventName, dispatchEventParams));
    });
  }

  async connect(permissions: IConnectRequestPayload['permissions']): Promise<IRuntimeConnectResponse> {
    if (
      !permissions ||
      !permissions.canRequestPublicKey && !permissions.canRequestSign
    ) {
      throw new Error('Value sent is not a valid');
    }

    const dispatchEventParams: IConnectRequestPayload = {
      origin: window.origin,
      host: window.location.host,
      permissions,
    };

    const results = await this.sendEventToContentScript<IConnectRequestPayload, IRuntimeConnectResponse>(XBULL_CONNECT, dispatchEventParams);
    console.log(results);

    this.isConnected = true;

    return results.detail;
  }

}

(window as any).xBullSDK = new Sdk();
