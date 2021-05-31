import React, { useEffect, useState } from "react";
import { message } from "antd";
import $ from "jquery";
import Services from "../../services";
import { isJSONStr } from "../../utils";
//@ts-ignore
import loadForm, { getFormDetail } from "../form";

export interface PropsType {
  pageUuid: string;
  formUuid: string;
  auditEnable: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  textColor: string;
  themeColor: string;
  isOffline?: boolean;
  submited: boolean;
  global: any;
}

export interface FormPropsType {
  formContainer: { current: HTMLDivElement | null };
  pageUuid: string;
  formUuid: string;
  themeColor: string;
  textColor: string;
  isOffline?: boolean;
  hostingServer: string;
  cl_cid: string;
  openId: string;
  callback?: () => void;
}

export function loadRegisterForm(
  props: FormPropsType,
  callback: (data) => void
) {
  loadForm({
    userInfo: {},
    formUuid: props.formUuid,
    pageMeta: {},
    pageUuid: props.pageUuid,
    server: props.hostingServer
      ? props.hostingServer
          .replace("http:", location.protocol)
          .replace("https:", location.protocol)
      : "",
    cl_cid: props.cl_cid,
    openId: props.openId,
    submitCallback: (submitRes: {
      cl_cid: string;
      mobile: string;
      name: string;
    }) => {
      if (!props.isOffline) {
        const data = {
          cid: submitRes.cl_cid,
          mobile: submitRes.mobile,
          name: submitRes.name,
        };
        Services.signInOnline(data)
          .then((res) => {
            if (callback) {
              callback(res);
            }
            //@ts-ignore
            if (res.cid) GlobalVariable.customerInfo.cid = res.cid;
            //@ts-ignore
            if (res.openId) GlobalVariable.customerInfo.openId = res.openId;
            if (res.cid) {
              //@ts-ignore
              SetCidToCookie(res.cid);
            }
            if (res.msg) {
              message.warning(res.msg);
            } else {
              message.success("报名成功");
            }
          })
          .catch((res) => {
            if (res.error) {
              if (res.error.message === "customer is enroll") {
                message.warning("当前用户已报名");
                return;
              }
              message.error(res.error.message);
              return;
            }
          });
      } else {
        Services.signInOffline({
          createMethod: "sceneEnroll",
          mobile: submitRes.mobile,
          name: submitRes.name,
          cid: submitRes.cl_cid,
        })
          .then((res) => {
            if (callback) {
              callback(res);
            }
            message.success("报名签到成功");
          })
          .catch((res) => {
            if (res.error) {
              if (res.error.message === "customer is enroll") {
                message.warning("当前用户已报名");
                return;
              }
              message.error(res.error.message);
              return;
            }
          });
      }
    },
  });
}

export function renderColor(themeColor: string, textColor: string) {
  $(".title-line .title-text").css("color", themeColor);
  $("#clGetCodeBtn").css("background", themeColor);
  $("#clGetCodeBtn").css("borderColor", themeColor);
  $("#clGetCodeBtn").css("color", textColor);
  $(
    `<style>
        .options-container:after{
            border-right-color: ${themeColor} !important;
            border-bottom-color: ${themeColor} !important;
        }
        .basic_form_white .select .radio:checked + .radioInput:after {
          background: ${themeColor} !important;
        }

        .basic_form_white .select .checkbox:checked + .checkboxInput:before {
          background: ${themeColor} !important;
        }
    </style>`
  ).appendTo("head");
}

export function useInitForm(props: FormPropsType) {
  const [pageContent, setPageContent] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [formFields, setFormFields] = useState([]);
  const [signCode, setSignCode] = useState<string>();
  const [signed, setSigned] = useState(false);
  const [enrollStatus, setEnrollStatus] = useState<number>();

  useEffect(() => {
    if (!props.formContainer) return;

    setLoading(true);
    getFormDetail(props.hostingServer, props.formUuid).then((res) => {
      let formFields = isJSONStr(res?.content)
        ? JSON.parse(res?.content).fields
        : [];
      const requireFields = ["mobile"];
      formFields = formFields.filter((f) => {
        if (~requireFields.indexOf(f.id)) {
          f.required = true;
        }
        return !f.isRating && !f.isImage && f.type !== "Line";
      });
      setFormFields(formFields);
      setTimeout(() => {
        renderColor(props.themeColor, props.textColor);
        setPageContent(props.formContainer?.current?.innerHTML);
        setLoaded(true);
        setLoading(false);
        setTimeout(() => {
          let callback = (
            data: Partial<{
              signCode: string;
              enrollStatus: number;
              msg: string;
            }>
          ) => {
            setSignCode(data.signCode);
            setEnrollStatus(data.enrollStatus);
            setSigned(true);
          };

          if (props.isOffline) {
            callback = (data) => {
              props.callback && props.callback();
            };
          }

          loadRegisterForm(props, callback);
        }, 0);
      }, 50);
    });
  }, [props.formContainer]);

  return {
    loaded,
    loading,
    signed,
    pageContent,
    formFields,
    signCode,
    enrollStatus,
  };
}
