<script lang="ts">
import loginForm from '@/forms/LoginForm'
import { defineComponent, inject } from 'vue';
import type { LoginRequest, LoginResponse } from '@/api/ApiTypes';
import { FormOptions, LoginHandler, SubmitHandler } from '@/types/types';



export default defineComponent({
    beforeCreate() {

    },
    setup() {
        const loginHandler = inject('loginHandler') as LoginHandler
        if (typeof loginHandler == 'undefined') {
            return { isHandlerPassed: false }
        }
        const { sections, toastHandler } = loginForm
        const options: FormOptions = {
            id: "login-form",
            title: "",
            withBackground: false,

        }

        const submitHandler: SubmitHandler<LoginRequest, LoginRequest, LoginResponse> = {
            submit: loginHandler.submit,
            errorHandler: loginHandler.errorHandler,
            redirectRoute: loginHandler.redirectRoute,
            submitCallBack: (res: LoginResponse) => {
                localStorage.setItem('token', res.loginInfo.accessToken)
                localStorage.setItem('permissions', res.permissions)
                localStorage.setItem('sideBar', res.sidebar)
            },
        }
        return { isHandlerPassed: true, options, sections, toastHandler, submitHandler }
    }
})
</script>

<template>
    <div class="login-wrapper" v-if="isHandlerPassed">
        <div class="left-img"></div>
        <div class="login-content">
            <div class="login-form">
                <app-logo disabled />
                <form-create :sections="sections" :submitHandler="submitHandler" :toastHandler="toastHandler"
                    :options="options" />
            </div>
        </div>
        <footer>
            <app-logo disabled iconOnly />
            <span>{{ $t('copyrighs') }}</span>
        </footer>
    </div>
    <div v-else>
        <h2 class="text-3xl text-center mb-4"> please add loginHandler to your dash-kit config to be able to use login
            functionality
        </h2>

    </div>
</template>

<style lang="scss">
.login-wrapper {
    background-repeat: no-repeat;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 100vh;

    position: relative;

    & .login-content {
        @media (min-width: 1000px) {
            width: calc(100vw - 500px);
        }
    }


    & .login-form {
        padding: 50px;
        max-width: 600px;

        @media (min-width: 1000px) {

            padding-inline-start: 200px;
        }

    }

    & .left-img {
        @media (min-width: 1000px) {
            width: 500px;
            height: 100vh;
            background: "/login-bg.webp";
        }
    }

    & footer {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 80px;
        position: absolute;
        bottom: 50px;
        left: 750px;

        & .logo-container {
            width: 60px;
            padding-inline-end: 10px;
            border-inline-end: 1px solid var(--color-text);
            margin-inline-end: 10px;
        }
    }

    .title {
        display: none;
    }

    & .left {
        height: 100vh;
    }

    & .right {
        background: var(--color-background);
        justify-content: start;
        align-items: center;

    }
}
</style>