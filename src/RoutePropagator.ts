import { useContext, useEffect } from "react";
import Router, { useRouter } from "next/router";
import { Context as AppBridgeContext, RoutePropagator as ShopifyRoutePropagator } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";

function RoutePropagator() {
  const router = useRouter();
  const { route, asPath }: { route: string, asPath: string } = router;
  const appBridge: any = useContext( AppBridgeContext );

  useEffect( () => {
    appBridge.subscribe( Redirect.Action.APP, ( payload: any ) => {
      Router.push( payload.path );
    } );
  }, [appBridge] );

  return appBridge && route ? (
    //@ts-ignore
    <ShopifyRoutePropagator location={asPath} app={appBridge} />
  ) : null;
}

export default RoutePropagator;