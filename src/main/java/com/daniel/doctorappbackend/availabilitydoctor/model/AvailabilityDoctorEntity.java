package com.daniel.doctorappbackend.availabilitydoctor.model;

import com.daniel.doctorappbackend.doctor.model.DoctorEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "availability_doctor")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AvailabilityDoctorEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id")
    private DoctorEntity doctor;

    @Column(name = "date_from")
    @Temporal(TemporalType.TIMESTAMP)
    private Date from;

    @Column(name = "date_to")
    @Temporal(TemporalType.TIMESTAMP)
    private Date to;

}
