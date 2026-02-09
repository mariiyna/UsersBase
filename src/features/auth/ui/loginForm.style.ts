export const formStyles = `
    margin: 0 auto;

    .ant-form-item {
        margin-bottom: 25px;
        width: 100%;

        &:last-child {
            margin-bottom: 0;
            .ant-form-item-control {
                text-align: right;
            }
        }
    }

    .ant-form-item-control {
        max-width: 100%;
        width: 100%;
    }

    @media (max-width: 580px) {
       position: relative;
        .ant-form-item {
            &:last-child {
                .ant-form-item-control {
                    position: absolute;
                    right: 0;
                    top: 100%;
                }
            }
        }
    }
`

