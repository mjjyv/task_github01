# Nội dung thiết bị mạng


**viettel01**

- Huawei OptiXstar HG8041X6-12
- GPON Terminal
- 192.168.1.1
- Trạng thái ghi chú: `no internet`
- Các cổng: PORT 1, PORT 2, PORT 3, PORT 4

**viettel02**

- EchoLife HG8145V5-20
- GPON Terminal
- 192.168.1.1
- Trạng thái ghi chú: `no internet`
- Các cổng: PORT 1, PORT 2, PORT 3, PORT 4

**vnpt02**

- iGate GW040
- GPON Optical Network Terminal
- 192.168.100.1
- Trạng thái ghi chú: `internet`
- Các cổng: PORT 1, PORT 2, PORT 3, PORT 4

**vnpt01**

- GPON ONT iGate GW020-H
- 192.168.1.1
- HW: GW020-Hv1
- Trạng thái ghi chú: `no internet`
- Các cổng: PORT 1, PORT 2

**mikrotik routerBOARD (xanh lá)**

- RB 3011UiAS-RM
- Các cổng: ETH1, ETH2, ETH3, ETH4, ETH5, ETH6, ETH7, ETH8, ETH9, ETH10, SFP

**mikrotik routerBOARD (cam)**

- hEX
- ID: RB750Gr3
- CDC-VNET
- Các cổng: ETH1, ETH2, ETH3, ETH4, ETH5

**Switch TOTO LINK SG24D**

- 24-Port Gigabit Desktop
- Các cổng: PORT 1 đến PORT 24

**Switch TP-Link**

- 24-Port Gigabit Switch
- TL-SG1024D
- Trạng thái ghi chú: `no internet`
- Các cổng: PORT 1 đến PORT 24

**DrayTek - Vigor2960**

- Dual-WAN Security Firewall
- Các cổng: PORT 1, PORT 2, PORT 3, PORT 4, PORT 5

**WT-8110**

- Media Converter
- WT-8110SB-11-20A
- 10/100M Single Mode WDM 20KM
- Wintop Optical Technology CO
- Cổng: 1 cổng mạng LAN và 1 cổng quang ký hiệu `...0K / PORT`

**Nhóm Server ảo hóa (Proxmox)**

- PROXMOX01
- PROXMOX02
- PROXMOX04
- PROXMOX10

**Các ghi chú văn bản khác trong sơ đồ**

- **internet:** cắm cáp từ laptop vào và ping được
- **no internet:** cắm cáp từ laptop vào và ping không được
- **chuyện ping thì tôi làm theo cảm tính thôi, chứ không rõ có cần ping để check không...*
- *WT-8110 đang chỉ có một port nên tôi không rõ nó hoạt động sao*

---

**Chi tiết các kết nối giữa các cổng trong sơ đồ:**

- **viettel01** (PORT 1) nối với **mikrotik routerBOARD RB 3011** (ETH1)
- **viettel02** (PORT 1) nối với **mikrotik routerBOARD RB 3011** (ETH3)
- **vnpt02** (PORT 1) nối với **mikrotik routerBOARD RB 3011** (ETH2)
- **vnpt01** (PORT 1) nối với **mikrotik routerBOARD hEX (RB750Gr3)** (ETH2)
- **mikrotik routerBOARD hEX (RB750Gr3)** (ETH5) nối với **Switch TP-Link TL-SG1024D** (PORT 5)
- **Switch TOTO LINK SG24D** (PORT 17) nối với **DrayTek Vigor2960** (PORT 4)
- **Media Converter WT-8110** (Cổng LAN RJ45 bên trái) nối với **DrayTek Vigor2960** (PORT 5)

---

**Kết nối giữa DrayTek Vigor2960 và cụm Proxmox:**

- **DrayTek Vigor2960** (PORT 1) nối với **PROXMOX01**
- **DrayTek Vigor2960** (PORT 2) nối với **PROXMOX04**
- **DrayTek Vigor2960** (PORT 3) nối với **PROXMOX02** và rẽ nhánh sang cả **PROXMOX10**

